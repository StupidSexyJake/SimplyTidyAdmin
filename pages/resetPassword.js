import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Material components
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
// Custom components
import Wrapper from '../components/Wrappers'
// Sections
import Header from '../sections/global/containers/Header'
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
        margin: '0 auto'
    },
    pageIcon: {
        fontSize: '120px',
    },
    signInFormContainer: {
        maxWidth: 60 * theme.spacing.unit,
    },
}))

export default function ResetPassword() {
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
                            Reset Password Form
                        </Wrapper>
                    </Grid>
                </Grid>
            </section>
        </React.Fragment>
    )
}