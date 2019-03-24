/* eslint-disable jsx-a11y/anchor-is-valid */
import '../src/bootstrap'
import React from 'react'
// Authentication
import { restrictToAuthUsers } from '../api/auth'
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

// Before page is rendered...
Index.getInitialProps = async ctx => {
    // Get token from cookies
    const token = cookie(ctx)['x-token']

    // Check if user is already logged in
    const isLoggedIn = await checkLoggedIn(ctx, token)

    // Redirect user to home page if already logged in
    if (!isLoggedIn) { redirect(ctx, '/') }

    // getInitialProps must return an object
    return {}
}

export default Index