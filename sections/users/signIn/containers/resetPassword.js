import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Actions
import {
    openSnackbar,
    handleClick
} from '../../../../state/actions'
// API
import { withApollo } from 'react-apollo'
import { USER_FORGOT_PASSWORD } from '../../../../api/graphql'
// Layout
import ResetPasswordForm from '../layouts/resetPassword'

function ResetPasswordFormContainer({ client }) {
    // Get state contexts
    const { state, dispatch } = useContext(Store)

    // Close dialog
    function closeDialog() {
        dispatch(handleClick('dialog', 'forgotPassword', false))
    }

    // Handle form submit
    const onSubmit = (event) => {
        // Prevent default form behaviour
        event.preventDefault()
        // Get login value from form
        const form = event.target
        const formData = new window.FormData(form)
        const login = formData.get('login')
        // Attempt to reset password
        client.query({
            query: USER_FORGOT_PASSWORD,
            variables: { login }
        })
            // On success...
            .then(() => {
                // Close dialog
                dispatch(handleClick('dialog', 'forgotPassword', false))
                // Notify user that email has been sent
                dispatch(openSnackbar(true, 'success', 'Please check your email to finish resetting your password', ''))
            })
            // On failure...
            .catch(error => {
                // Notify user of failure
                dispatch(openSnackbar(true, 'error', 'Email or username does not exist', ''))
            })
    }
    return (
        <ResetPasswordForm
            onSubmit={(event) => onSubmit(event)}
            dialogState={state.dialog.forgotPassword}
            closeDialog={closeDialog}
        />
    )
}

export default withApollo(ResetPasswordFormContainer)