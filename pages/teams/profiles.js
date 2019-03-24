/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../src/bootstrap'
import React from 'react'
// Authentication
import { restrictPageAccess } from '../../api/auth'
// Global page layout
import Page from '../../sections/global/containers/Page'
// Page specific sections
import TeamList from '../../sections/teams/profiles/containers/'

function TeamProfiles() {
    return (
        <Page
            title='Services'
            metaDescription='Services'
        >
            <TeamList />
        </Page>
    )
}

// Before page is rendered...
TeamProfiles.getInitialProps = async ctx => {
    // Restrict page access to authenticated users only
    restrictPageAccess(ctx, 'users')
    // getInitialProps must return an object
    return {}
}

export default TeamProfiles