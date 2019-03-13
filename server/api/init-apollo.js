import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BatchHttpLink } from 'apollo-link-batch-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

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
})


// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = process.browser ? split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === 'OperationDefinition' && operation === 'subscription'
    },
    wsLink,
    httpLink,
) : httpLink

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
    global.fetch = fetch
}

function create(initialState) {
    // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link,
        cache: new InMemoryCache().restore(initialState || {})
    })
}

export default function initApollo(initialState) {
    // Make sure to create a new client for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState)
    }

    // Reuse client on the client-side
    if (!apolloClient) {
        apolloClient = create(initialState)
    }

    return apolloClient
}