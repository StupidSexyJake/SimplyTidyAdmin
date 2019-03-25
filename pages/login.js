/* eslint-disable jsx-a11y/anchor-is-valid */
import '../src/bootstrap'
import React from 'react'
// Authentication
import nextCookie from 'next-cookies'
import { checkLoggedIn, redirect } from '../api/auth'
// Material components
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// Custom components
import Wrapper from '../components/Wrappers'
// Sections
import Header from '../sections/global/containers/Header'
import SignInForm from '../sections/users/signIn/containers/'
// Icons
import PageIcon from '@material-ui/icons/Group'

// Create Index styles
const indexStyles = makeStyles(theme => ({
    root: {
        background: `-moz-linear-gradient(225deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        background: `-webkit-gradient(linear, left bottom, right top, color-stop(0%, ${theme.palette.primary.light}), color-stop(100%, ${theme.palette.primary.main}))`,
        background: `-webkit-linear-gradient(225deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        background: `-o-linear-gradient(225deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        background: `-ms-linear-gradient(225deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        background: `linear-gradient(225deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
        filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='${theme.palette.primary.light}', endColorstr='${theme.palette.primary.main}',GradientType=1 )`,
        height: '100vh',
        color: theme.palette.primary.contrastText,
        textShadow: theme.custom.palette.textShadow
    },
    gridContainer: {
        height: '100%'
    },
    pageIconContainer: {
        width: 'fit-content',
        margin: '0 auto'
    },
    pageIcon: {
        fontSize: '120px',
    },
    signInFormContainer: {
        maxWidth: 60 * theme.spacing.unit,
    },
}))

function Index() {
    // Define styles
    const classes = indexStyles()
    return (
        <React.Fragment>
            <Header
                title='Login'
                metaDescription='Login to Gold Coast Maids admin portal'
            />
            <section className={classes.root}>
                <Grid container
                    alignItems='center'
                    justify='center'
                    className={classes.gridContainer}
                >
                    <Grid item>
                        <div className={classes.pageIconContainer}>
                            <PageIcon className={classes.pageIcon} />
                        </div>

                        <Typography
                            variant='h3'
                            component='h1'
                            align='center'
                            color='inherit'
                        >
                            Welcome Back
                        </Typography>
                        <Wrapper
                            variant='content'
                            className={classes.signInFormContainer}
                        >
                            <SignInForm />
                            <Divider />
                            <Typography>
                                Forgot Password?
                            </Typography>
                            <Divider />
                        </Wrapper>
                        <Typography style={{ paddingTop: '48px' }} align='center'>
                            Copyright 2019 Gold Coast Maids.
                        </Typography>
                    </Grid>
                </Grid>
            </section>
        </React.Fragment>
    )
}

// Before page is rendered...
Index.getInitialProps = async ctx => {
    // Check if user is logged in
    const me = await checkLoggedIn(ctx)
    console.log(me)
    // If already signed in, redirect to home page
    if (me) { redirect(ctx, '/') }
    // Return
    return {}
}

export default Index