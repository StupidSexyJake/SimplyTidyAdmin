import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error'
import { ApolloLink, split, Observable } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import { REFRESH_AUTH_TOKEN } from './graphql'
import cookie from 'cookie'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

function create(initialState, { getToken }) {
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

    // Create auth link
    const authLink = setContext((_, { headers }) => {
        const tokens = getToken()
        return {
            headers: {
                ...headers,
                'x-token': tokens['x-token'] ? tokens['x-token'] : '',
                'x-token-refresh': tokens['x-token-refresh'] ? tokens['x-token-refresh'] : ''
            }
        }
    })

    // Refresh auth token
    function getNewAuthToken(refreshToken) {
        client.mutate({
            mutation: REFRESH_AUTH_TOKEN,
            variables: {
                refreshToken
            },
        })
            .then(data => {
                document.cookie = cookie.serialize('x-token', data)
            })
            .catch(err => { return err })
    }


    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    const client = new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.from([
            // onError(({ graphQLErrors, networkError, operation, forward }) => {
            //     if (graphQLErrors) {
            //         console.log('***********************')
            //         console.log('hit graphQL error')
            //         console.log('******************')
            //         for (let err of graphQLErrors) {
            //             switch (err.extensions.code) {
            //                 case 'UNAUTHENTICATED':
            //                 // const oldHeaders = operation.getContext().headers
            //                 // const refreshToken = oldHeaders['x-token-refresh']
            //                 // promiseToObservable(getNewAuthToken(refreshToken)).flatMap(() => forward(operation))
            //                 // .then(data => {
            //                 //     console.log('***********************')
            //                 //     console.log('then hit')
            //                 //     console.log('***********************')
            //                 //     operation.setContext({
            //                 //         headers: {
            //                 //             ...oldHeaders,
            //                 //             'x-token': data.refreshAuthToken.token,
            //                 //         },
            //                 //     })
            //                 //     return forward(operation)
            //                 // })
            //                 // .catch(err => {
            //                 //     console.log('***********************')
            //                 //     console.log('catch hit graphQL')
            //                 //     console.log(err.errors)
            //                 //     console.log('***********************')
            //                 //     return {}
            //                 // })
            //             }
            //         }
            //     }
            //     if (networkError) {
            //         console.log('***********************')
            //         console.log('hit network error')
            //         console.log('******************')
            //         for (let err of networkError.result.errors) {
            //             switch (err.extensions.code) {
            //                 case 'UNAUTHENTICATED':
            //                     const oldHeaders = operation.getContext().headers
            //                     const refreshToken = oldHeaders['x-token-refresh']
            //                     client.mutate({
            //                         mutation: REFRESH_AUTH_TOKEN,
            //                         variables: {
            //                             refreshToken
            //                         },
            //                     })
            //                         .then(data => {
            //                             console.log('***********************')
            //                             console.log('then hit')
            //                             console.log('***********************')
            //                             operation.setContext({
            //                                 headers: {
            //                                     ...oldHeaders,
            //                                     'x-token': data.refreshAuthToken.token,
            //                                 },
            //                             })
            //                             return forward(operation)
            //                         })
            //                         .catch(err => {
            //                             console.log('***********************')
            //                             console.log('catch hit network')
            //                             console.log(err)
            //                             console.log('***********************')
            //                             return {}
            //                         })
            //             }
            //         }
            //     }
            // }),
            // authLink,
            terminatingLink
        ]),
        cache: new InMemoryCache().restore(initialState || {})
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