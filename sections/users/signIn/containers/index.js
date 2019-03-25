import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Actions
import {
    handleClick,
    resetState,
} from '../../../../state/actions'
// API and authentication
import cookie from 'js-cookie'
import {
    signInUser,
    redirect,
} from '../../../../api/auth'
import {
    Mutation,
    withApollo
} from 'react-apollo'
import { USER_SIGN_IN } from '../../../../api/graphql'
// Layout
import Index from '../layouts/'

function SignInFormContainer({ client }) {
    // Get state contexts
    const { state, dispatch } = useContext(Store)

    // Define variables
    const isLoginDisabled = state.user.password === 0 || state.user.login === 0

    // Handle login value changes
    const onChange = event => {
        const { name, value } = event.target
        dispatch(handleClick('user', name, value.length))
    }

    // Handle form submit
    const onSubmit = (event) => {
        // Prevent default form behaviour
        event.preventDefault()
        // Get login values from form
        const form = event.target
        const formData = new window.FormData(form)
        const login = formData.get('login')
        const password = formData.get('password')
        // Attempt to sign in
        signInUser(login, password, client)
    }

    // Handle show/hide password
    const onShowHidePassword = () => {
        dispatch(handleClick('user', 'showPassword', !state.user.showPassword))
    }
    return (
        <Index
            onSubmit={(event) => onSubmit(event)}
            onChange={(event) => onChange(event)}
            onShowHidePassword={onShowHidePassword}
            showPassword={state.user.showPassword}
            isLoginDisabled={isLoginDisabled}
            isInvalidLogin={state.user.invalidLogin}
        />

    )
}

export default withApollo(SignInFormContainer)