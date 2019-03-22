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
        return {
            headers: {
                ...headers,
                'x-token': tokens['x-token'] ? tokens['x-token'] : '',
                'x-token-refresh': tokens['x-token-refresh'] ? tokens['x-token-refresh'] : ''
            }
        }
    })

    // Refresh auth token
    const getNewToken = () => {
        const refreshToken = getTokens()['x-token-refresh']
        if (!refreshToken) { return '' }
        client.mutate({
            mutation: REFRESH_AUTH_TOKEN,
            variables: {
                refreshToken
            }
        })
            .then(results => {
                return results.data.refreshAuthToken.token
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

    let isFetchingToken = false;
    let tokenSubscribers = [];
    function subscribeTokenRefresh(cb) {
        tokenSubscribers.push(cb);
    }
    function onTokenRefreshed(err) {
        tokenSubscribers.map(cb => cb(err));
    }

    const errorLink = () =>
        onError(({ graphQLErrors, networkError, operation, forward }) => {
            if (networkError) console.error(`[Network error]: ${networkError}`);

            if (graphQLErrors) {
                const { message, locations, path, extensions } = graphQLErrors[0];
                console.error(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${
                    extensions.code
                    }`,
                );

                if (extensions.code === 'UNAUTHENTICATED') {
                    return new Observable(async observer => {
                        try {
                            const retryRequest = () => {
                                operation.setContext({
                                    headers: {
                                        ...headers,
                                        'x-token': getNewToken(),
                                        'token-test': 'test'
                                    },
                                });

                                const subscriber = {
                                    next: observer.next.bind(observer),
                                    error: observer.error.bind(observer),
                                    complete: observer.complete.bind(observer),
                                };

                                return forward(operation).subscribe(subscriber);
                            };

                            const { headers } = operation.getContext();

                            if (!isFetchingToken) {
                                isFetchingToken = true;

                                try {
                                    await getNewToken();

                                    isFetchingToken = false;
                                    onTokenRefreshed(null);
                                    tokenSubscribers = [];

                                    return retryRequest();
                                } catch (e) {
                                    onTokenRefreshed(new Error('Unable to refresh access token'));

                                    tokenSubscribers = [];
                                    isFetchingToken = false;
                                    return
                                    // return globalProvider.logOut({ forcedLogOut: true });
                                }
                            }

                            const tokenSubscriber = new Promise((resolve, reject) => {
                                subscribeTokenRefresh(errRefreshing => {
                                    if (!errRefreshing) return resolve(retryRequest());
                                });
                            });

                            return tokenSubscriber;
                        } catch (e) {
                            observer.error(e);
                        }
                    });
                }
            }
        });

    // Create Apollo Client
    const client = new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
        link: ApolloLink.from([
            authLink,
            errorLink,
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