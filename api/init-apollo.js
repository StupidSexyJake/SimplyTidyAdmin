import fetch from 'isomorphic-unfetch'
// Apollo Client
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'
// Apollo Link
import { ApolloLink, split } from 'apollo-link'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { WebSocketLink } from 'apollo-link-ws'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
// GraphQL
import { REFRESH_AUTH_TOKEN } from './graphql'

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
        console.log('...................')
        console.log('getTokens')
        const tokens = getTokens()
        console.log(tokens)
        console.log('...................')
        return {
            headers: {
                ...headers,
                'x-token': tokens['x-token'] ? tokens['x-token'] : '',
                'x-token-refresh': tokens['x-token-refresh'] ? tokens['x-token-refresh'] : ''
            }
        }
    })

    // Create error link
    const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
        console.log('error')
        if (graphQLErrors) {
            for (let err of graphQLErrors) {
                switch (err.extensions.code) {
                    case 'UNAUTHENTICATED':
                        const headers = operation.getContext().headers
                        operation.setContext({
                            headers: {
                                ...headers,
                                'x-token': refreshAuthToken(),
                            },
                        })
                        return forward(operation)
                }
            }
        }
    })

    // Refresh auth token
    const refreshAuthToken = async () => {
        // Get refresh token from cookies
        const refreshToken = await getTokens()['x-token-refresh']
        // Get new auth token from server
        client.mutate({
            mutation: REFRESH_AUTH_TOKEN,
            variables: {
                refreshToken
            }
        })
            .then(data => {
                document.cookie = cookie.serialize('x-token', data.data.refreshAuthToken.token, {})
                return data.data.refreshAuthToken.token
            })
            .catch(error => {
                console.log('.............................................')
                console.log('ERROR RECEIVED WHILE REFRESHING AUTH TOKEN:')
                console.log('.............................................')
                error.networkError.result.errors.map(errorMsg => console.log(errorMsg))
                return
            })
    }

    // Create Apollo Client
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.from([
            errorLink,
            authLink,
            terminatingLink,
        ]),
        cache: new InMemoryCache().restore(initialState || {}),
    })
}

export default function initApollo(initialState, options) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState, options)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState, options)
    }

    return apolloClient
}