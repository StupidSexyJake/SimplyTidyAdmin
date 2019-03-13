import React from 'react'
// Layout
import DialogUpdate from './dialogCU'

export default function TeamUpdate(props) {
    return (
        <DialogUpdate
            title='Edit Team'
            submitButtonTitle='Update'
            dialogState={props.dialogState}
            closeDialog={props.closeDialog}
            onSubmit={props.onSubmit}
            team={props.team}
        />
    )
}