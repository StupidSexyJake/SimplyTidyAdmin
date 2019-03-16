import React from 'react'
// MUI components
import { makeStyles } from '@material-ui/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import DialogContentText from '@material-ui/core/DialogContentText'
// Layout
import ConfirmDialog from '../../../../../components/ConfirmDialog'

// Create TeamDelete styles
const teamDeleteStyles = makeStyles((theme) => ({
    content: {
        paddingBottom: 0
    }
}))

export default function TeamDelete(props) {
    // Define styles
    const classes = teamDeleteStyles()
    // Set dialog title
    const dialogTitle = `Are you sure you want to ${props.checkbox.checked || props.team.status === 'Archived' ? 'permanently delete' : 'archive'} ${props.team.name}?`
    return (
        <ConfirmDialog
            title={dialogTitle}
            content={
                props.team.status !== 'Archived' ?
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={props.checkbox.checked}
                                    onChange={props.checkbox.onChange}
                                    value='deleteTeam'
                                />
                            }
                            label='Permanently delete (this action is irreversible)'
                        />
                    </FormGroup>
                    :
                    <DialogContentText>
                        {props.team.name} is already archived. Are you sure you want to permanently delete this team? This action is irreversible.
                    </DialogContentText>
            }
            contentClass={classes.content}
            submitButtonTitle={props.checkbox.checked || props.team.status === 'Archived' ? 'Delete Team' : 'Archive Team'}
            dialogState={props.dialogState}
            closeDialog={props.closeDialog}
            onSubmit={props.onSubmit}
        />
    )
}