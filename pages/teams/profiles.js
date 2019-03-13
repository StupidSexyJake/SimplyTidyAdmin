/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../src/bootstrap'
import React from 'react'
// MUI components
import { makeStyles } from '@material-ui/styles'
// Common sections
import Header from '../../sections/layout/Header'
import Page from '../../sections/layout/Page'
// Page specific sections
import TeamList from '../../sections/containers/teams/profiles/listAll'

// Create Services styles
const servicesStyles = makeStyles(theme => ({
}))

export default function TeamProfiles() {
    // Define styles
    const classes = servicesStyles()
    return (
        <React.Fragment>
            <Header
                title='Services'
                metaDescription='Services'
            />
            <Page>
                <TeamList />
            </Page>
        </React.Fragment>
    )
}