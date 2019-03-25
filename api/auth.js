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
export function checkLoggedIn(ctx) {
    // Verify auth token with server (auth token sent in request headers in ./init-apollo.js)
    ctx.apolloClient.query({
        query: GET_ME,
    })
        // Return logged in user on verification success
        .then(({ data }) => {
            console.log('get me results:')
            console.log(data)
            return { data }
        })

        // Return no user on verification failure
        .catch((error) => {
            console.error('Error in catch of checkLoggedIn() in auth.js:')
            console.error(error)
            console.log('*****************')
            return {}
        })
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
        .then((data) => {
            console.log('success login')
            console.log(data)
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
export async function refreshAuthToken(refreshToken, client, ctx) {
    // Fetch a new auth token from the server
    await client.mutate({
        mutation: REFRESH_AUTH_TOKEN,
        variables: {
            refreshToken
        }
    })
        // On success...
        .then(data => {
            console.log('get cookies in refreshAuthToken')
            console.log(nextCookie(ctx)['x-token'])
            // Save new token to cookies
            setCookie(ctx, 'x-token-test', data.data.refreshAuthToken)

            // Return new token
            return data.data.refreshAuthToken
        })

        // Log refresh failures for debugging
        .catch(error => {
            console.error('Error received in fetchNewAuthToken() catch of auth.js:')
            console.error(error)
            console.log('*****************')
        })
}

// Restrict page access
export function restrictPageAccess(ctx, restrictedTo) {
    // Get token from cookies
    const token = nextCookie(ctx)['x-token']

    // Get logged in user
    const isLoggedIn = checkLoggedIn(ctx, token)

    // Redirect user to login page if not logged in
    if (!isLoggedIn && restrictedTo === 'users') { redirect(ctx, '/login') }

    // Redirect user to home page if already logged in
    if (isLoggedIn && restrictedTo === 'public') { redirect(ctx, '/') }
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