import Router from 'next/router'
import {
    GET_ME,
    USER_SIGN_IN,
    REFRESH_AUTH_TOKEN,
} from './graphql'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

// Check if user is logged in
export async function checkLoggedIn(ctx) {
    // Verify auth token with server (auth token sent in request headers in ./init-apollo.js)
    await ctx.apolloClient.query({
        query: GET_ME,
    })
        // Return logged in user on verification success
        .then(({ data }) => {
            return { loggedInUser: data }
        })
        // Return nothing on verification failure
        .catch(() => { return { loggedInUser: {} } })
}

// Attempt to sign in user
export function signInUser(login, password, client) {
    console.log('logging in...')
    // Attempt to sign in
    client.query({
        query: USER_SIGN_IN,
        variables: { login, password }
    })
        // On successful login...
        .then(({ data }) => {
            // Save tokens to cookies
            cookie.set('x-token', data.signIn.token)
            cookie.set('x-token-refresh', data.signIn.refreshToken)
            // Force a reload of all the current queries
            client.cache.reset()
            // Return new tokens
            return data.data.signIn
        })
        // Return error message on login fail for debugging
        .catch(error => {
            console.error('Eror in catch of signIn() auth.js')
            console.error(error)
            console.log('*****************')
        })
}

// Refresh expired auth tokens
export async function refreshAuthToken(refreshToken, client) {
    // Fetch a new auth token from the server
    await client.mutate({
        mutation: REFRESH_AUTH_TOKEN,
        variables: {
            refreshToken
        }
    })
        // Return new token on success
        .then(({ data }) => { return data.refreshAuthToken })
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
    Router.replace(target)

}