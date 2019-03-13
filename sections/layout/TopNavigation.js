import React, { useContext } from 'react'
// Next.js
import Link from 'next/link'
import { withRouter } from 'next/router'
// State
import { Store } from '../../state/store'
// Data
import {
    navPages,
    navActions
} from '../../data/navigationData'
// MUI components
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
// Custom components
import Logo from '../../components/Logo'

// Create ActiveLink styles
const activeLinkStyles = makeStyles((theme) => ({
    activeLink: {
        color: `${theme.palette.primary.dark} !important`,
        marginTop: -0.25 * theme.spacing.unit
    },
    activeLinkBorder: {
        borderBottom: `1px solid ${theme.palette.primary.dark}`
    }
}))

// Create styles for active navigation link
const ActiveLink = ({ children, router, href }) => {
    // Define styles
    const classes = activeLinkStyles()    
    // Define class for active link
    const borderBottom = router.pathname === href ? classes.activeLinkBorder : undefined
    // Set buttonState to true for active link
    const buttonState = router.pathname === href ? true : false
    return (
        <Link
            prefetch
            href={href}
        >
            <Button
                disabled={buttonState}
                component='a'
                classes={{ disabled: classes.activeLink }}
            >
                <span className={borderBottom}>
                    {children}
                </span>
            </Button>
        </Link>
    )
}
const NavLink = withRouter(ActiveLink)

// Create TopNavigation styles
const topNavigationStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: {
        paddingLeft: 0.5 * theme.spacing.unit,
        paddingRight: 0.5 * theme.spacing.unit
    },
    logo: {
        marginLeft: 2 * theme.spacing.unit,
        marginRight: 2.5 * theme.spacing.unit,
    },
    navGroup: {
        flexGrow: 1
    },
}))

export default function TopNavigation() {
    // Get state contexts
    const { dispatch } = useContext(Store)
    // Define styles
    const classes = topNavigationStyles()
    return (
        <AppBar
            position='fixed'
            color='default'
            className={classes.appBar}
        >
            <Toolbar
                disableGutters // Can't figure out how to change theme.mixins.gutters so manually setting here under className
                className={classes.toolbar}
            >
                <Logo
                    variant='navbar'
                    anchorStyles={classes.logo}
                />
                <div className={classes.navGroup}>
                    {navPages.map((link) => (
                        <NavLink
                            key={link.key}
                            href={link.href}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>
            </Toolbar>
        </AppBar>
    )
}