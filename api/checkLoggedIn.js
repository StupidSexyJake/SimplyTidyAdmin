import { GET_ME } from './graphql'

export default apolloClient =>
    apolloClient
        .query({
            query: GET_ME
        })
        .then(({ data }) => {
            console.log('got me')
            console.log(data)
            return { loggedInUser: data }
        })
        .catch((err) => {
            console.log('no me')
            return { loggedInUser: {} }
        })