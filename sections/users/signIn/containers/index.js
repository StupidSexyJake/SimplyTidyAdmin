import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Actions
import {
    handleClick,
    resetState,
} from '../../../../state/actions'
// API and authentication
import { setCookie } from 'nookies'
import { redirect } from '../../../../api/auth'
import { withApollo } from 'react-apollo'
import { USER_SIGN_IN } from '../../../../api/graphql'
// Layout
import Index from '../layouts/'

function SignInFormContainer({ client, ctx }) {
    // Get state contexts
    const { state, dispatch } = useContext(Store)

    // Define variables
    const isLoginDisabled = state.user.password === 0 || state.user.login === 0

    // Handle login value changes
    const onChange = event => {
        const { name, value } = event.target
        dispatch(handleClick('user', name, value.length))
    }

    // Get 'remember me' current value
    const isRememberMeChecked = state.user.remember

    // Handle 'remember me' toggle
    const onRememberMeToggle = () => {
        dispatch(handleClick('user', 'remember', !isRememberMeChecked))
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
        const remember = isRememberMeChecked
        // Attempt to sign in
        try {
            client.query({
                query: USER_SIGN_IN,
                variables: {
                    login,
                    password,
                    remember
                }
            })
            // // On successful sign-in
            // .then(({ data }) => {
            //     // Save tokens to cookies
            //     setCookie(ctx, 'x-token', data.signIn.token, { maxAge: 30 * 60 })
            //     setCookie(ctx, 'x-token-refresh', data.signIn.refreshToken, { maxAge: 30 * 24 * 60 * 60 })
            //     // Reset user login state
            //     dispatch(resetState('user'))
            //     // Force a reload of all the current queries
            //     client.cache.reset()
            //         .then(() => {
            //             // Redirect user to homepage
            //             redirect({}, '/')
            //         })
            // })
            // .catch(error => {
            //     console.log('error logging in:')
            //     console.log(error)
            // })
        } catch (error) {
            console.log(error)
        }
    }

    // Handle show/hide password
    const onShowHidePassword = () => {
        dispatch(handleClick('user', 'showPassword', !state.user.showPassword))
    }
    return (
        <Index
            onSubmit={(event) => onSubmit(event)}
            onChange={(event) => onChange(event)}
            isRememberMeChecked={isRememberMeChecked}
            onRememberMeToggle={onRememberMeToggle}
            onShowHidePassword={onShowHidePassword}
            showPassword={state.user.showPassword}
            isLoginDisabled={isLoginDisabled}
            isInvalidLogin={state.user.invalidLogin}
        />
    )
}

export default withApollo(SignInFormContainer)