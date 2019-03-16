import { GET_ME } from './graphql'

export default apolloClient =>
    apolloClient
        .query({
            query: GET_ME
        })
        .then(({ data }) => {
            return { loggedInUser: data }
        })
        .catch(() => {
            // Fail gracefully
            return { loggedInUser: {} }
        })