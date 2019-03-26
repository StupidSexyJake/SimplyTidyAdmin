import React from 'react'
// API
import { ApolloConsumer } from 'react-apollo'
import { signOut } from '../../../api/auth'
// MUI components
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
// Custom components
import Logo from '../../../components/Logo'
// Icons
import SignOutButton from '@material-ui/icons/ExitToApp'

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
}))

export default function TopNavigation({ ctx }) {
    // Define styles
    const classes = topNavigationStyles()
    return (
        <AppBar
            position='fixed'
            color='default'
            className={classes.appBar}
        >
            <Toolbar
                disableGutters // Not sure how to change theme.mixins.gutters so manually setting here under className
                className={classes.toolbar}
            >
                <Logo
                    variant='navbar'
                    anchorStyles={classes.logo}
                />
                <ApolloConsumer>
                    {client => (
                        <IconButton
                            onClick={() => signOut(ctx, client)}
                        >
                            <SignOutButton />
                        </IconButton>
                    )}
                </ApolloConsumer>
            </Toolbar>
        </AppBar>
    )
}