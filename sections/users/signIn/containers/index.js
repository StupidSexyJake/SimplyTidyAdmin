import React, { useContext } from 'react'
// State
import { Store } from '../../../../state/store'
// Actions
import {
    handleClick,
    resetState,
    openSnackbar
} from '../../../../state/actions'
// API and authentication
import cookie from 'cookie'
import redirect from '../../../../api/redirect'
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
        if (value.length === 0 || value.length === 1) return dispatch(handleClick('user', name, value.length))
    }

    // Handle form submit
    const onSubmit = async (event, signIn) => {
        console.log
        // Prevent default form behaviour
        event.preventDefault()
        // Get login values from form
        const form = event.target
        const formData = new window.FormData(form)
        const login = formData.get('login')
        const password = formData.get('password')
        // Sign in
        console.log('attempting to sign in')
        await signIn({ variables: { login, password } })
            .then(data => {
                console.log('sign in success. data:')
                console.log(data)
                // // Store the tokens in cookies
                document.cookie = await cookie.serialize('x-token', data.data.signIn.token, {})
                document.cookie = await cookie.serialize('x-token-refresh', data.data.signIn.refreshToken, {})
            })
            .then(() => {
                // Reset user login state
                dispatch(resetState('user'))
                // Force a reload of all the current queries
                client.cache.reset()
                    // Redirect client back to homepage
                    .then(() => {
                        console.log('redirecting home')
                        redirect({}, '/')
                    })
            })
            .catch(error => {
                console.log('sign in failed. error:')
                console.log(error)
                // Handle error messages
                if (error.message === 'GraphQL error: No user found with this login credentials.') {
                    dispatch(handleClick('user', 'invalidLogin', true))
                    dispatch(openSnackbar(
                        true,
                        'error',
                        'Invalid login details',
                        ''
                    ))
                }
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