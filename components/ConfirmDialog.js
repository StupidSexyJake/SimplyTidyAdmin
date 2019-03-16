import React from 'react'
// MUI Components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'

// Create transition
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default function ConfirmDialog(props) {
    return (
        <Dialog
            fullWidth
            open={props.dialogState}
            onClose={props.closeDialog}
            aria-labelledby='confirm-dialog'
            TransitionComponent={Transition}
        >
            <DialogTitle id='confirm-dialog'>
                {props.title}
            </DialogTitle>
            <DialogContent className={props.contentClass}>
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