import { GET_ME } from './graphql'

export default apolloClient =>
    apolloClient
        .query({
            query: GET_ME
        })
        .then(({ data }) => {
            console.log('Got "me"')
            console.log(data)
            return { loggedInUser: data }
        })
        .catch((err) => {
            console.log('Me not found - checkLoggedIn')
            console.log(err)
            console.log('...................')
            return { loggedInUser: {} }
        })