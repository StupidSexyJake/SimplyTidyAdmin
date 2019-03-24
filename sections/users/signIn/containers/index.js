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
    const onSubmit = async (event) => {
        // Prevent default form behaviour
        event.preventDefault()

        // Get login values from form
        const form = event.target
        const formData = new window.FormData(form)
        const login = formData.get('login')
        const password = formData.get('password')

        // Attempt to sign in
        signInUser(login, password)
            // On successful sign-in
            .then(({ token, refreshToken }) => {
                console.log('login success')
                // Save tokens in cookies
                cookie.set('x-token', token)
                cookie.set('x-token-refresh', refreshToken)

                // Reset user login state
                dispatch(resetState('user'))

                // Redirect user to homepage
                redirect({}, '/')
            })
            .catch(error => {
                console.log('error logging in:')
                console.log(error)
            })
    }

    // Handle show/hide password
    const onShowHidePassword = () => {
        dispatch(handleClick('user', 'showPassword', !state.user.showPassword))
    }

    return (
        <Mutation
            mutation={USER_SIGN_IN}
            variables={{ login: state.user.login, password: state.user.password }}
        >
            {(signIn, { data, loading, error }) => (
                <Index
                    loading={loading}
                    onSubmit={(event) => onSubmit(event, signIn)}
                    onChange={(event) => onChange(event)}
                    onShowHidePassword={onShowHidePassword}
                    showPassword={state.user.showPassword}
                    isLoginDisabled={isLoginDisabled}
                    isInvalidLogin={state.user.invalidLogin}
                />
            )}
        </Mutation>
    )
}

export default withApollo(SignInFormContainer)