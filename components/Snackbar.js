import React, { useContext } from 'react'
import classNames from 'classnames'
// State
import { Store } from '../state/store'
// Actions
import { closeSnackbar } from '../state/actions'
// MUI Components
import { makeStyles } from '@material-ui/styles'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
// Icons
import SuccessIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import CloseIcon from '@material-ui/icons/Close'
// Colors
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'

// Define icon types
const variantIcon = {
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

// Create styles
const snackbarStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    undoBtn: {
        marginTop: '0'
    },
    closeBtn: {
        padding: theme.spacing.unit / 2,
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
}))

export default function MySnackbar(props) {
    // Get state contexts
    const { state, dispatch } = useContext(Store)
    // Define styles
    const classes = snackbarStyles()
    // Get variant type
    const Icon = variantIcon[state.snackbar.variant || 'error']
    // Handle close
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        dispatch(closeSnackbar())
    }
    // Handle undo
    function handleUndo() {
        dispatch(closeSnackbar())
        state.snackbar.undo()
    }
    return (
        <Snackbar
            open={state.snackbar.open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <SnackbarContent
                className={classNames(classes[state.snackbar.variant], props.className)}
                aria-describedby="snackbar-message"
                message={
                    <span
                        id='snackbar-message'
                        className={classes.message}
                    >
                        <Icon className={classNames(classes.icon, classes.iconVariant)} />
                        {state.snackbar.message}
                    </span>
                }
                action={[
                    state.snackbar.showUndo ?
                        <Button
                            className={classes.undoBtn}
                            key='undo'
                            color='inherit'
                            size='small'
                            onClick={handleUndo}
                        >
                            UNDO
                        </Button>
                        : '',
                    <IconButton
                        key='close'
                        aria-label='Close'
                        color='inherit'
                        className={classes.closeBtn}
                        onClick={handleClose}
                    >
                        <CloseIcon className={classes.icon} />
                    </IconButton>
                ]}
            />
        </Snackbar>
    )
}