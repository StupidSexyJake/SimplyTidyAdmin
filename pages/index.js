/* eslint-disable jsx-a11y/anchor-is-valid */
import '../src/bootstrap'
import React from 'react'
// Authentication
import {
    checkLoggedIn,
    redirect,
} from '../api/auth'
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
    // Get logged in user
    const isLoggedIn = await checkLoggedIn(ctx)
    // Redirect user to login page if not logged in
    if (!isLoggedIn) { redirect(ctx, '/login') }
    // Return empty object (getInitialProps must return an object)
    return {}
}

export default Index