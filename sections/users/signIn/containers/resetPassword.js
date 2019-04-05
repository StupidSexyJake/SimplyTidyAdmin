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
import { USER_RESET_PASSWORD } from '../../../../api/graphql'
// Layout
import ResetPasswordForm from '../layouts/resetPassword'

function ResetPasswordFormContainer({ client, token }) {
    // Get state contexts
    const { state, dispatch } = useContext(Store)

    // Handle show/hide password
    const onShowHidePassword = () => {
        dispatch(handleClick('user', 'showPassword', !state.user.showPassword))
    }

    // Handle form submit
    const onSubmit = (event) => {
        // Prevent default form behaviour
        event.preventDefault()
        // Get login value from form
        const form = event.target
        const formData = new window.FormData(form)
        const password = formData.get('password')
        console.log('token:')
        console.log(token)
        console.log('password:')
        console.log(password)
        // Attempt to reset password
        client.mutate({
            mutation: USER_RESET_PASSWORD,
            variables: { token, password }
        })
            // On success...
            .then((data) => {
                console.log(data)
                // Notify user that password has been changed
                dispatch(openSnackbar(true, 'success', 'Password successfully changed', ''))
            })
            // On failure...
            .catch(error => {
                console.log(error)
                // Notify user of failure
                dispatch(openSnackbar(true, 'error', 'Password could not be changed', ''))
            })
    }
    return (
        <ResetPasswordForm
            onSubmit={(event) => onSubmit(event)}
            onShowHidePassword={onShowHidePassword}
            showPassword={state.user.showPassword}
        />
    )
}

export default withApollo(ResetPasswordFormContainer)