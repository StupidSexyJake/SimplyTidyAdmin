import { GET_ME } from './graphql'

export default apolloClient => {
    console.log('checking logged in')
    return apolloClient
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
            return { loggedInUser: {} }
        })
}