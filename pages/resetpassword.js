/* eslint-disable jsx-a11y/anchor-is-valid */
import '../src/bootstrap'
import React from 'react'
// API
import { USER_VALIDATE_RESET_PASSWORD_TOKEN } from '../api/graphql'
// Material components
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
// Custom components
import Wrapper from '../components/Wrappers'
// Sections
import Header from '../sections/global/containers/Header'
import ResetPasswordForm from '../sections/users/signIn/containers/resetPassword'
// Icons
import PageIcon from '@material-ui/icons/Lock'

// Create ResetPassword styles
const resetPasswordStyles = makeStyles(theme => ({
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
        margin: '0 auto 16px auto'
    },
    pageIcon: {
        fontSize: '120px',
    },
    signInFormContainer: {
        maxWidth: 60 * theme.spacing.unit,
    },
}))

// Validate reset password token
function getUserFromToken(ctx, token) {
    // Verify token with server
    return ctx.apolloClient.query({
        query: USER_VALIDATE_RESET_PASSWORD_TOKEN,
        variables: {
            token
        }
    })
        // Return user id on verification success
        .then(({ data }) => {
            return data.userValidateResetPasswordToken
        })
        // Return nothing on verification failure
        .catch(() => {
            return {}
        })
}

function ResetPassword({ token, userId }) {
    // Define styles
    const classes = resetPasswordStyles()
    return (
        <React.Fragment>
            <Header
                title='Reset Password'
                metaDescription='Reset password for GoldCoastMaids user accounts'
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
                            Reset Password
                        </Typography>
                        <Wrapper
                            variant='content'
                            className={classes.signInFormContainer}
                        >
                            <ResetPasswordForm />
                        </Wrapper>
                    </Grid>
                </Grid>
            </section>
        </React.Fragment>
    )
}

ResetPassword.getInitialProps = async ctx => {
    // Get token from URL
    const token = ctx.query.token
    // Validate token and get user
    const userId = await getUserFromToken(ctx, token)
    // Redirect if invalid user
    if (!userId) {
        redirect(ctx, '/login')
    }
    return { token, userId }
}

export default ResetPassword