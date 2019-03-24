import fetch from 'isomorphic-unfetch'
// Apollo Client
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'
// Apollo Link
import { ApolloLink, split, Observable } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
// Authorisation
import cookie from 'js-cookie'
import { refreshAuthToken } from './auth'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

function create(initialState, { getTokens }) {
    // Create a WebSocket link
    const wsLink = process.browser ? new WebSocketLink({
        uri: `ws://108.61.96.127:8000/graphql`,
        options: {
            reconnect: true,
        },
    }) : null

    // Create an http link (use batch, allow cookies response from server)
    const httpLink = new BatchHttpLink({
        uri: 'http://108.61.96.127/api/',
        credentials: 'include'
    })

    // Split terminating link for websocket and http requests
    const terminatingLink = process.browser ? split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query)
            return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink,
        httpLink,
    ) : httpLink

    // Set headers to include auth and refresh tokens
    const authLink = setContext((_, { headers }) => {
        const tokens = getTokens()
        return {
            headers: {
                ...headers,
                'x-token': tokens['x-token'] ? tokens['x-token'] : '',
                'x-token-refresh': tokens['x-token-refresh'] ? tokens['x-token-refresh'] : ''
            }
        }
    })

    // Handle errors
    const errorLink = () => onError(({ graphQLErrors, networkError, operation, forward }) => {
        // If network error, output message to console for debugging
        if (networkError) console.error(`[Network error]: ${networkError}`)
        // If graphQL error...
        if (graphQLErrors) {
            // If error is due to unathenticated user request and a refresh token is available...
            const { extensions } = graphQLErrors[0]
            const refreshToken = getTokens()['x-token-refresh']
            if (extensions.code === 'UNATHENTICATED' && refreshToken) {
                // Create a new Observerable
                return new Observable(async observer => {
                    // Refresh the auth token
                    refreshAuthToken(refreshToken)
                        // On successful refresh...
                        .then((newToken) => {
                            // Save new token to cookies
                            cookie.set('x-token', newToken)
                            // Bind observable subscribers
                            const subscriber = {
                                next: observer.next.bind(observer),
                                error: observer.error.bind(observer),
                                complete: observer.complete.bind(observer)
                            }
                            // Retry last failed request
                            forward(operation).subscribe(subscriber)
                        })
                        .catch(error => {
                            // No refresh or client token available, force user to login
                            observer.error(error)
                        })
                })

            }
        }
    })

    // Concat links
    const link = ApolloLink.from([
        authLink,
        errorLink,
        terminatingLink,
    ]),

    // Create Apollo Client
    const client = new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link,
        cache: new InMemoryCache().restore(initialState || {})
    })
    return client
}


export default function initApollo(initialState, options) {
    // Make sure to create a new client for every server-side request so that data isn't shared between connections
    if (!process.browser) {
        return create(initialState, options)
    }
    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options)
    }
    return apolloClient
}