import cookie from 'next-cookies'
import { GET_ME } from './graphql'

// Function: check if user is logged in
export default function checkLoggedin(ctx) {
    // Get auth token from cookies
    const token = cookie(ctx)['x-token']

    // Return false if no auth token provided
    if (!token) { return false }

    // Verify auth token with server (auth token sent in request headers in ./init-apollo.js)
    return ctx.apolloClient
        .query({
            query: GET_ME,
        })

        // Return true on verification success
        .then(() => {
            return true
        })

        // Return false on verification failure
        .catch(() => { return false })
}