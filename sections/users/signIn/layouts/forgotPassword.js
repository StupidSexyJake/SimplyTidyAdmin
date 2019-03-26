import React from 'react'
// MUI Components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Slide from '@material-ui/core/Slide'

export default function ForgotPasswordLayout(props) {
    return (
        <Dialog
            open={props.dialogState}
            onClose={props.closeDialog}
            aria-labelledby='forgotPassword'
            TransitionComponent={<Slide direction="up" />}
        >
            <DialogTitle id='forgotPassword'>
                Forgot Password
            </DialogTitle>
            <form onSubmit={props.onSubmit}>
                <DialogContent>
                    <TextField
                        label='Email or username'
                        name='login'
                        id='login'
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={props.closeDialog}
                        color='primary'
                    >
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        variant='contained'
                        color='secondary'
                    >
                        Reset Password
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}