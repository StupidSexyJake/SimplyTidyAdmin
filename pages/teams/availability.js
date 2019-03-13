/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../src/bootstrap'
import React from 'react'
// Material components
import { makeStyles } from '@material-ui/styles'
// Common sections
import Header from '../../sections/layout/Header'
import Page from '../../sections/layout/Page'
import TeamAvailabilityList from '../../sections/layout/teams/availability/listAll'

// Create Services styles
const servicesStyles = makeStyles(theme => ({
}))

export default function Services() {
    // Define styles
    const classes = servicesStyles()
    return (
        <React.Fragment>
            <Header
                title='Services'
                metaDescription='Services'
            />
            <Page>
                <TeamAvailabilityList />
            </Page>
        </React.Fragment>
    )
}