/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../src/bootstrap'
import React from 'react'
// Authentication
import { checkLoggedIn, redirect } from '../../api/auth'
// Global page layout
import Page from '../../sections/global/containers/Page'

function EmailSettings() {
    return (
        <Page
            title='Email Settings'
            metaDescription='Email settings'
        >
            Test
        </Page>
    )
}

// Before page is rendered...
EmailSettings.getInitialProps = async ctx => {
    // Check if user is logged in
    const { loggedInUser } = await checkLoggedIn(ctx)
    // If not signed in, redirect to login page
    if (!loggedInUser.me) { redirect(ctx, '/admin/login') }
    // Return
    return { loggedInUser }
}

export default EmailSettings