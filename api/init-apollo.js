import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { onError } from 'apollo-link-error'
import { ApolloLink, split } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'

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

    // Create an http link (allow batch)
    const httpLink = new BatchHttpLink({
        uri: 'http://108.61.96.127/api/',
        credentials: 'same-origin'
    })


    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const terminatingLink = process.browser ? split(
        // split based on operation type
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query)
            return kind === 'OperationDefinition' && operation === 'subscription'
        },
        wsLink,
        httpLink,
    ) : httpLink

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) => {
                // console.log(message.replace('GraphQL error: ', ''))
                // if (message === 'UNAUTHENTICATED') {
                //   signOut(client)
                // }
            })
        }
        if (networkError) {
            console.log('Network error', networkError)
            //   if (networkError.statusCode === 401) {
            //     signOut(client)
            //   }
        }
    })

    const authLink = setContext((_, { headers }) => {
        const token = getToken()
        return {
            headers: {
                ...headers,
                authorization: token ? token : ''
            }
        }
    })

    const link = ApolloLink.from([authLink, errorLink, terminatingLink])

    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link,
        cache: new InMemoryCache().restore(initialState || {})
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