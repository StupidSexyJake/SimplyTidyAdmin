import Router from 'next/router'
import {
    GET_ME,
    REFRESH_AUTH_TOKEN,
} from './graphql'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

// Check if user is logged in
export function checkLoggedIn(ctx) {
    // Verify auth token with server (auth token sent in request headers in ./init-apollo.js)
    return ctx.apolloClient.query({
        query: GET_ME,
    })
        // Return logged in user on verification success
        .then(({ data }) => {
            return { loggedInUser: data }
        })
        // Return nothing on verification failure
        .catch(() => { return { loggedInUser: {} } })
}

// Refresh expired auth tokens
export function refreshAuthToken(refreshToken, client, ctx) {
    // Delete current auth token
    destroyCookie(ctx, 'x-token')
    // Fetch a new auth token from the server
    return client.mutate({
        mutation: REFRESH_AUTH_TOKEN,
        variables: {
            refreshToken
        }
    })
        // Return new token on success
        .then(({ data }) => {
            return data.refreshAuthToken
        })
        // Log refresh failures for debugging
        .catch(error => {
            console.error('Error received in refreshAuthToken() catch of auth.js:')
            console.error(error)
            console.log('*****************')
            return {}
        })
}

// Handle redirects
export function redirect(ctx, target) {
    // Check if in server
    if (ctx.res) {
        ctx.res.writeHead(303, { Location: target })
        ctx.res.end()
    }
    // Continue redirect if in browswer
    else {
        Router.replace(target)
    }

}