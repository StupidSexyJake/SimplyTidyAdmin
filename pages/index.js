/* eslint-disable jsx-a11y/anchor-is-valid */
import '../src/bootstrap'
import React from 'react'
// Authentication
import redirect from '../api/redirect'
import checkLoggedIn from '../api/checkLoggedIn'
// Material components
import { makeStyles } from '@material-ui/styles'
// Global page layout
import Page from '../sections/global/containers/Page'

// Create Index styles
const indexStyles = makeStyles(theme => ({
}))

function Index() {
    // Define styles
    const classes = indexStyles()
    return (
        <React.Fragment>
            <Page
                title='Admin Portal'
                metaDescription='Admin Portal for Gold Coast Maids'
            >
                test
            </Page>
        </React.Fragment>
    )
}

Index.getInitialProps = async (context, apolloClient) => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    if (!loggedInUser.me) {
        redirect(context, '/login')
    }
    return { loggedInUser }
}

export default Index