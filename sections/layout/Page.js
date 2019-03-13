import React from 'react'
// Material components
import { makeStyles } from '@material-ui/styles'
// Common sections
import TopNavigation from './TopNavigation'
import SideNavigation from './SideNavigation'

// Define drawer width (in px)
const drawerWidth = 240

// Create Page styles
const pageStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
}))

export default function Page(props) {
    // Define styles
    const classes = pageStyles()
    return (
        <div className={classes.root}>
            <TopNavigation drawerWidth={drawerWidth} />
            <SideNavigation drawerWidth={drawerWidth} />
            <div className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </div>
        </div>
    )
}