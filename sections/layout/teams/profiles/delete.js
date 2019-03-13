import React from 'react'
// MUI components
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
// Layout
import ConfirmDialog from '../../../../components/ConfirmDialog'

export default function TeamDelete(props) {
    // Set dialog title
    const dialogTitle = `Are you sure you want to remove team ${props.team.name}?`
    return (
        <ConfirmDialog
            title={dialogTitle}
            content={
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={props.checkbox.checked}
                                onChange={props.checkbox.onChange}
                                value="deleteTeam"
                            />
                        }
                        label="Permanently delete (this action is irreversible)"
                    />
                </FormGroup>
            }
            submitButtonTitle={props.checkbox.checked ? 'Delete Team' : 'Archive Team'}
            dialogState={props.dialogState}
            closeDialog={props.closeDialog}
            onSubmit={props.onSubmit}
        />
    )
}