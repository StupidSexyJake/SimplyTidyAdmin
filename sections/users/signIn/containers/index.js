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
        const { name, value } = event.target;
        (value.length === 0 || value.length === 1) && dispatch(handleClick('user', name, value.length))
    }

    // Handle form submit
    const onSubmit = async (event, signIn) => {
        // Prevent default form behaviour
        event.preventDefault()
        // Get login values from form
        const form = event.target
        const formData = new window.FormData(form)
        const login = formData.get('login')
        const password = formData.get('password')
        // Sign in
        try {
            await signIn({ variables: { login, password } })
        } catch (error) {
            console.log(error.message)
        }
    }

    // Handle show/hide password
    const onShowHidePassword = () => {
        dispatch(handleClick('user', 'showPassword', !state.user.showPassword))
    }

    return (
        <Mutation
            mutation={USER_SIGN_IN}
            variables={{ login: state.user.login, password: state.user.password }}
            onCompleted={data => {
                // Store the token in cookie
                document.cookie = cookie.serialize('token', data.signIn.token, {
                    maxAge: 30 * 24 * 60 * 60 // 30 days
                })
                // Reset user login state
                dispatch(resetState('user'))
                // Force a reload of all the current queries
                client.cache.reset()
                    // Redirect client back to homepage
                    .then(() => {
                        redirect({}, '/')
                    })
            }}
            onError={error => {
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
                // Reset cookie
                document.cookie = cookie.serialize('token', '', {
                    maxAge: 0
                })
            }}
        >
            {(signIn, { data, loading, error }) => (
                <Index
                    loading={loading}
                    // loginValue={state.user.login}
                    // passwordValue={state.user.password}
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