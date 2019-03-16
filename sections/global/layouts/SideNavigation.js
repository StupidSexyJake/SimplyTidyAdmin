import React from 'react'
// Next.js
import Link from 'next/link'
// Utils
import { VariantInput } from '../../../utils/functions'
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
// Sections
import { NavLink } from '../containers/SideNavigation'

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
export function ActiveLink(props) {

    // Define styles
    const classes = activeLinkStyles()

    // Define class if active link    
    const activeLinkClass = (href) => props.isActivePage(href) ? classes.activeLink : undefined

    // Create parent link layout
    const parentLink = (
        <ListItem
            button
            disabled={props.isActivePage(props.href)}
            classes={{ disabled: classes.activeLink }}
            onClick={props.onClickParent}
        >
            <ListItemIcon className={activeLinkClass(props.href)}>
                <VariantInput
                    inputVariant={props.link.icon}
                    className={activeLinkClass(props.href)}
                />
            </ListItemIcon>
            <ListItemText
                primaryTypographyProps={{ className: activeLinkClass(props.href) }}
                primary={props.link.label}
            />
            {props.hasSubs ?
                props.linkState ?
                    <ExpandLess />
                    :
                    <ExpandMore />
                :
                null
            }
        </ListItem>
    )

    return (
        <React.Fragment>
            {props.hasSubs ?
                parentLink
                :
                <Link
                    prefetch
                    href={props.link.href}
                    key={props.link.key}
                >
                    {parentLink}
                </Link>
            }
            {props.hasSubs &&
                <Collapse
                    in={props.linkState}
                    unmountOnExit
                >
                    <List disablePadding>
                        {props.link.sub.map((subLink) => (
                            <Link
                                prefetch
                                href={props.href + subLink.href}
                                key={subLink.key}
                            >
                                <ListItem
                                    button
                                    className={classes.nested}
                                    disabled={props.isActivePage(props.href + subLink.href)}
                                    classes={{ disabled: classes.activeLink }}
                                >
                                    <ListItemIcon className={activeLinkClass(props.href + subLink.href)}>
                                        <VariantInput
                                            inputVariant={subLink.icon}
                                            className={activeLinkClass(props.href + subLink.href)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primaryTypographyProps={{ className: activeLinkClass(props.href + subLink.href) }}
                                        primary={subLink.label}
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
                {props.navPages.map((link) => (
                    <NavLink
                        key={link.label}
                        href={link.href}
                        link={link}
                    />
                ))}
            </List>
            <Divider />
            <List>
                {props.navActions.map((link) => (
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