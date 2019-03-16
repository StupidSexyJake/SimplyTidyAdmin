import React from 'react'
// MUI Components
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FilledInput from '@material-ui/core/FilledInput'
import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
// Icons
import UsernameIcon from '@material-ui/icons/Person'
import PasswordIcon from '@material-ui/icons/Lock'
import ShowPasswordIcon from '@material-ui/icons/Visibility'
import HidePasswordIcon from '@material-ui/icons/VisibilityOff'
import { TextField } from '@material-ui/core';

// Create Index styles
const SignInFormLayoutStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing.unit,
    },
    input: {
        marginBottom: theme.spacing.unit,
    },
    inputLabel: {
        // marginLeft: '20px',
    },
    rememberContainer: {
        margin: 0,
        color: theme.palette.common.white
    },
    submitButton: {
        margin: theme.spacing.unit
    }
}))

export default function SignInFormLayout(props) {
    // Define styles
    const classes = SignInFormLayoutStyles()
    return (
        <FormGroup>
            <form onSubmit={(event) => props.onSubmit(event)}>
                <TextField
                    error={props.isInvalidLogin}
                    label='Username'
                    variant='filled'
                    fullWidth
                    required
                    name='login'
                    id='login'
                    onChange={(event) => props.onChange(event)}
                    // value={props.loginValue}
                    className={classes.input}
                    helperText='test'
                />
                <FormControl
                    fullWidth
                    className={classes.formControl}
                >

                    <InputLabel
                        error={props.isInvalidLogin}
                        htmlFor='login'
                        variant='filled'
                        className={classes.inputLabel}
                    >

                        Username
                    </InputLabel>
                    <FilledInput
                        error={props.isInvalidLogin}
                        fullWidth
                        required
                        name='login'
                        id='login'
                        onChange={(event) => props.onChange(event)}
                        // value={props.loginValue}
                        className={classes.input}
                        helperText='test'
                    />
                </FormControl>
                <FormControl
                    fullWidth
                    className={classes.formControl}
                >
                    <InputLabel
                        error={props.isInvalidLogin}
                        htmlFor='password'
                        variant='filled'
                    >
                        Password
                    </InputLabel>
                    <FilledInput
                        error={props.isInvalidLogin}
                        fullWidth
                        required
                        name='password'
                        id='password'
                        type={props.showPassword ? 'input' : 'password'}
                        onChange={(event) => props.onChange(event)}
                        // value={props.passwordValue}
                        className={classes.input}
                        endAdornment={
                            <IconButton onClick={props.onShowHidePassword}>
                                {props.showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                            </IconButton>
                        }
                    />
                </FormControl>
                <FormControlLabel
                    className={classes.rememberContainer}
                    control={
                        <Switch
                            // checked={state.checkedB}
                            // onChange={handleChange('checkedB')}
                            value="remember"
                            color="secondary"
                        />
                    }
                    label="Remember me for 30 days"
                />
                <Button
                    fullWidth
                    type='submit'
                    variant='contained'
                    color='secondary'
                    disabled={props.isLoginDisabled || props.loading}
                    className={classes.submitButton}
                    size='large'
                >
                    Sign In
                </Button>
            </form>
        </FormGroup>
    )
}