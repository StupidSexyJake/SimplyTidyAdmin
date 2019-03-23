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
// GraphQL
import { REFRESH_AUTH_TOKEN } from './graphql'
// Authentication
import cookie from 'cookie'

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
        console.log('auth link runs')
        return {
            headers: {
                ...headers,
                'x-token': tokens['x-token'] ? tokens['x-token'] : '',
                'x-token-refresh': tokens['x-token-refresh'] ? tokens['x-token-refresh'] : ''
            }
        }
    })

    // Refresh auth token
    async function fetchNewAuthToken(refreshToken) {
        client.mutate({
            mutation: REFRESH_AUTH_TOKEN,
            variables: {
                refreshToken
            }
        })
            .then(results => {
                console.log('**********************')
                console.log('new auth token fetched successfully:')
                console.log(results)
                console.log('**********************')
                return results.data.refreshAuthToken.token
            })
            .catch(error => {
                console.log('**********************')
                console.log('error on fetchNewAuthToken')
                console.log(error)
                console.log('**********************')
            })
    }

    // Create error link
    // const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    //     console.log(Router)
    //     if (graphQLErrors) {
    //         for (let err of graphQLErrors) {
    //             switch (err.extensions.code) {
    //                 case 'UNAUTHENTICATED':
    //                     const headers = operation.getContext().headers
    //                     operation.setContext({
    //                         headers: {
    //                             ...headers,
    //                             'x-token': getNewToken()
    //                         },
    //                     })
    //                     console.log('new token')
    //                     console.log(getNewToken())
    //                     console.log('retrying last request - next line should be "checking logged in"')
    //                     return forward(operation)
    //             }
    //         }
    //     }
    // })


    // Create Apollo Client
    const client = new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.from([
            authLink,
            onError(({ graphQLErrors, networkError, operation, forward }) => {
                // If network error, output message in console for debugging
                if (networkError) console.error(`[Network error]: ${networkError}`)
                // If graphQL error...
                if (graphQLErrors) {
                    // Get error details
                    const { message, locations, path, extensions } = graphQLErrors[0]
                    // Output to console for debugging
                    console.error(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${
                        extensions.code
                        }`,
                    )
                    // Only continue if a refresh and auth token is available
                    const refreshToken = getTokens()['x-token-refresh']
                    const authToken = getTokens()['x-token']
                    if (refreshToken && authToken) {
                        // If error is due to being unathenticated...
                        if (extensions.code === 'UNAUTHENTICATED') {
                            // Create a new Observer
                            return new Observable(async observer => {
                                // Refresh auth token
                                fetchNewAuthToken(refreshToken)
                                    .then(newAuthToken => {
                                        console.log('**********************')
                                        console.log('new auth token received:')
                                        console.log(newAuthToken)
                                        console.log('**********************')
                                        operation.setContext(({ headers = {} }) => ({
                                            headers: {
                                                // Re-add old headers
                                                ...headers,
                                                // Switch out old access token for new one
                                                'x-token': newAuthToken || null,
                                            }
                                        }))
                                        console.log('**********************')
                                        console.log('new headers:')
                                        console.log(operation.getContext().headers)
                                        console.log('**********************')
                                    })
                                    .then(() => {
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
                                        console.log('**********************')
                                        console.log('error getting new auth tokens line 167')
                                        console.log(error)
                                        console.log('**********************')
                                        // No refresh or client token available, force user to login
                                        observer.error(error)
                                    })
                            })
                        }
                    }
                }
            }),
            terminatingLink,
        ]),
        cache: new InMemoryCache().restore(initialState || {}),
    })
    return client
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