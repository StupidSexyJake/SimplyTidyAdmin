import React, { useContext } from 'react'
// Next.js
import Link from 'next/link'
import { withRouter } from 'next/router'
// State
import { Store } from '../../state/store'
// Actions
import { handleClick } from '../../state/actions'
// Data
import {
    navPages,
    navActions
} from '../../data/navigationData'
// Utils
import { VariantInput } from '../../utils/functions'
// MUI components
import { makeStyles } from '@material-ui/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
// Icons
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

// Create NavigationList styles
const activeLinkStyles = makeStyles(theme => ({
    activeLink: {
        color: theme.palette.primary.dark,
        background: theme.palette.primary.light,
        opacity: 1
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    }
}))

// Create styles for active navigation link
const ActiveLink = ({ router, href, link }) => {
    // Get state contexts
    const { state, dispatch } = useContext(Store)
    // Define styles
    const classes = activeLinkStyles()
    // Define class for active link
    const activeLinkClass = router.pathname === href ? classes.activeLink : undefined
    const buttonState = router.pathname === href ? true : false
    // Define class for active sub links
    const activeSubLinkClass = router.pathname === href ? classes.activeLink : undefined
    return (
        <React.Fragment>
            {/* <Link
                prefetch
                href={href}
            > */}
            <ListItem
                button
                disabled={buttonState}
                classes={{ disabled: classes.activeLink }}
                onClick={() => dispatch(handleClick('navigation', link.id, !state.navigation[link.id]))}
            >
                <ListItemIcon className={activeLinkClass}>
                    <VariantInput
                        inputVariant={link.icon}
                        className={activeLinkClass}
                    />
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{ className: activeLinkClass }}
                    primary={link.label}
                />
                {link.sub ? state.navigation[link.id] ? <ExpandLess /> : <ExpandMore /> : ''}
            </ListItem>
            {/* </Link> */}
            {link.sub &&
                <Collapse
                    in={state.navigation[link.id]}
                    unmountOnExit
                >
                    <List disablePadding>
                        {link.sub.map((subNav) => (
                            <Link
                                prefetch
                                href={href + subNav.href}
                                key={subNav.key}
                            >
                                <ListItem
                                    button
                                    className={classes.nested}
                                    disabled={router.pathname === href + subNav.href ? true : false}
                                    classes={{ disabled: classes.activeLink }}
                                >
                                    <ListItemIcon className={router.pathname === href + subNav.href && classes.activeLink}>
                                        <VariantInput
                                            inputVariant={subNav.icon}
                                            className={router.pathname === href + subNav.href && classes.activeLink}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primaryTypographyProps={{ className: router.pathname === href + subNav.href && classes.activeLink }}
                                        primary={subNav.label}
                                    />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Collapse>
            }
        </React.Fragment>
    )
}
const NavLink = withRouter(ActiveLink)

// Create SideNavigation styles
const sideNavigationStyles = makeStyles(theme => ({
    drawer: {
        width: props => props.drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: props => props.drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}))

export default function SideNavigation(props) {
    // Define styles
    const classes = sideNavigationStyles(props)
    return (
        <Drawer
            className={classes.drawer}
            variant='permanent'
            anchor='left'
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <div className={classes.toolbar} />
            <List>
                {navPages.map((link) => (
                    <NavLink
                        key={link.label}
                        href={link.href}
                        link={link}
                    />
                ))}
            </List>
            <Divider />
            <List>
                {navActions.map((link) => (
                    <ListItem
                        button
                        key={link.label}
                    >
                        <ListItemIcon>
                            <VariantInput inputVariant={link.icon} />
                        </ListItemIcon>
                        <ListItemText primary={link.label} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}