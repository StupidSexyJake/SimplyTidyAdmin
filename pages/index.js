/* eslint-disable jsx-a11y/anchor-is-valid */
import '../src/bootstrap'
import React from 'react'
// Material components
import { makeStyles } from '@material-ui/styles'
// Common sections
import Header from '../sections/Header'

// Index styles
const useStyles = makeStyles(theme => ({
}))

export default function Index() {
    // Define styles
    const classes = useStyles()
    return (
        <React.Fragment>
            <Header
                title="Admin Portal"
                metaDescription="Admin Portal for Gold Coast Maids"
            />
        </React.Fragment>
    )
}