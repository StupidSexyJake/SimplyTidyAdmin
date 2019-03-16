/* eslint-disable jsx-a11y/anchor-is-valid */
import '../src/bootstrap'
import React from 'react'
// Authentication
import redirect from '../api/redirect'
import checkLoggedIn from '../api/checkLoggedIn'
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
    gridItem: {
        // marginTop: '-64px'
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
    // card: {
    //     maxWidth: 60 * theme.spacing.unit,
    //     margin: '0 auto'
    // },
    // cardTitle: {
    //     background: theme.palette.primary.main,
    //     color: theme.palette.common.white
    // }
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
                    <Grid item
                        className={classes.gridItem}
                    >
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
                        <Typography style={{ paddingTop: '48px' }}>
                            Copyright 2019 Gold Coast Maids. What the fuck did you say to me?
                        </Typography>
                    </Grid>
                </Grid>
            </section>
        </React.Fragment>
    )
}

Index.getInitialProps = async (context, apolloClient) => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient)
    if (loggedInUser.me) {
        redirect(context, '/')
    }
    return {}
}

export default Index