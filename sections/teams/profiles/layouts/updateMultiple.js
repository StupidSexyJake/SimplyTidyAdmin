import React from 'react'
// Layout
import DialogUpdate from './dialogCUMultiple'

export default function TeamUpdate(props) {
    return (
        <DialogUpdate
            title='Edit Teams'
            submitButtonTitle='Update'
            dialogState={props.dialogState}
            closeDialog={props.closeDialog}
            onSubmit={props.onSubmit}
            defaultValue={
                {
                    status: props.defaultValue && props.defaultValue.status
                }
            }
        />
    )
}