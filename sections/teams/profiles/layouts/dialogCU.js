import React from 'react'
// MUI Components
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import Slide from '@material-ui/core/Slide'

function Transition(props) {
    return <Slide direction="up" {...props} />
}

export default function TeamCRU(props) {
    return (
        <Dialog
            fullWidth
            open={props.dialogState}
            onClose={props.closeDialog}
            aria-labelledby='teamCU-dialog'
            TransitionComponent={Transition}
        >
            <DialogTitle id='teamCU-dialog'>
                {props.title}
            </DialogTitle>
            <form onSubmit={props.onSubmit}>
                <DialogContent>
                    <TextField
                        label='Team Name'
                        name='name'
                        id='name'
                        defaultValue={props.team && props.team.name}
                        required
                    />
                    <br />
                    <TextField
                        label='Status'
                        name='status'
                        id='status'
                        defaultValue={props.team && props.team.status}
                        required
                    />
                    <br />
                    <TextField
                        label='Mobile'
                        name='mobile'
                        id='mobile'
                        defaultValue={props.team && props.team.mobile}
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
                        {props.submitButtonTitle}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}