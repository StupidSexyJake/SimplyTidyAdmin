import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Actions
import { openSnackbar } from '../../../../state/actions'
// API
import { Mutation } from 'react-apollo'
import { USER_FORGOT_PASSWORD } from '../../../../api/graphql'
// Layout
import ForgotPassword from '../layouts/forgotPassword'

export default function ForgotPasswordContainer() {
    // Get state contexts
    const { state, dispatch } = useContext(Store)

    // Close dialog
    function closeDialog() {
        dispatch(handleClick('dialog', 'forgotPassword', false))
    }

    // Handle form submit
    const onSubmit = (event, userForgotPassword) => {
        // Prevent default form behaviour
        event.preventDefault()
        // Get login value from form
        const form = event.target
        const formData = new window.FormData(form)
        const login = formData.get('login')
        // Attempt to reset password
        userForgotPassword({
            variables: {
                login,
            }
        })
            // On success...
            .then((data) => {
                console.log('successful reset')
                console.log(data)
                // Close dialog
                dispatch(handleClick('dialog', 'forgotPassword', false))
                // Notify user that email has been sent
                dispatch(openSnackbar(true, 'success', 'Please check your email', ''))
            })
            // On failure...
            .catch(error => {
                console.log('failed to reset')
                console.log(error)
                // Notify user of failure
                dispatch(openSnackbar(true, 'error', 'Email or username does not exist', ''))
            })
    }
    return (
        <Mutation mutation={USER_FORGOT_PASSWORD}>
            {(userForgotPassword, { data, loading, error }) => (
                <ForgotPassword
                    onSubmit={(event) => onSubmit(event, userForgotPassword)}
                    dialogState={state.dialog.forgotPassword}
                    closeDialog={closeDialog}
                />
            )}
        </Mutation>
    )
}