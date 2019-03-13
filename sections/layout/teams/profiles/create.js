import React from 'react'
// Layout
import DialogCreate from './dialogCU'

export default function TeamCreate(props) {
    return (
        <DialogCreate
            title='Add New Team'
            submitButtonTitle='Create'
            dialogState={props.dialogState}
            closeDialog={props.closeDialog}
            onSubmit={props.onSubmit}
            onChange={props.onChange}
        />
    )
}