/* eslint-disable jsx-a11y/anchor-is-valid */
import '../src/bootstrap'
import React from 'react'
// Material components
import { makeStyles } from '@material-ui/styles'
// Common sections
import Header from '../sections/layout/Header'
import Page from '../sections/layout/Page'

// Create Index styles
const indexStyles = makeStyles(theme => ({
}))

export default function Index() {
    // Define styles
    const classes = indexStyles()
    return (
        <React.Fragment>
            <Header
                title="Admin Portal"
                metaDescription="Admin Portal for Gold Coast Maids"
            />
            <Page>
                test
            </Page>
        </React.Fragment>
    )
}