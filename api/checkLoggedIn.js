import cookie from 'cookie'
import { GET_ME, REFRESH_AUTH_TOKEN } from './graphql'

function parseCookies(req, options = {}) {
    return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options)
}

export default apolloClient =>
    apolloClient
        .query({
            query: GET_ME
        })
        .then(({ data }) => {
            console.log('hit get me')
            console.log(data)
            return { loggedInUser: data }
        })
        .catch((err) => {
            console.log('catch get me')
            // Get tokens from cookies
            // const tokens = parseCookies()
            // console.log(tokens)
            // apolloClient.mutate({
            //     mutation: REFRESH_AUTH_TOKEN,
            //     variables: {
            //                             token: oldHeaders['x-token'],
            //                             refreshToken: oldHeaders['x-token-refresh']
            //                         },
            // })
            return { loggedInUser: {} }
        })