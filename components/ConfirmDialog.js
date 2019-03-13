import React from 'react'
// MUI Components
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

// Create styles
const confirmDialogStyles = makeStyles(theme => ({
    formGroupContainer: {
        paddingBottom: 0
    },
}))

export default function ConfirmDialog(props) {
    // Define styles
    const classes = confirmDialogStyles()
    return (
        <Dialog
            open={props.dialogState}
            onClose={props.closeDialog}
            aria-labelledby='confirm-dialog'
        >
            <DialogTitle id='confirm-dialog'>
                {props.title}
            </DialogTitle>
            <DialogContent className={classes.formGroupContainer}>
                {props.content}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.closeDialog}
                    color='primary'
                >
                    Cancel
                </Button>
                <Button
                    onClick={props.onSubmit}
                    variant='contained'
                    color='secondary'
                >
                    {props.submitButtonTitle}
                </Button>
            </DialogActions>
        </Dialog>
    )
}