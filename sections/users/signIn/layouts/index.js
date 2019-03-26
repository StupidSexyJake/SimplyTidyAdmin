import React from 'react'
// MUI Components
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FilledInput from '@material-ui/core/FilledInput'
import Switch from '@material-ui/core/Switch'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
// Icons
import UsernameIcon from '@material-ui/icons/Person'
import PasswordIcon from '@material-ui/icons/Lock'
import ShowPasswordIcon from '@material-ui/icons/Visibility'
import HidePasswordIcon from '@material-ui/icons/VisibilityOff'

// Create Index styles
const SignInFormLayoutStyles = makeStyles(theme => ({
    formControl: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    input: {
        backgroundColor: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.common.white,
        },
        '&.focused': {
            backgroundColor: theme.palette.common.white,
        },
    },
    inputProps: {
        marginLeft: theme.spacing.unit
    },
    inputLabel: {
        marginLeft: 5.5 * theme.spacing.unit
    },
    inputIcon: {
        color: 'rgba(0, 0, 0, 0.54)',
        marginRight: 1 * theme.spacing.unit,
    },
    divider: {
        width: 1,
        height: 28,
        marginRight: 0.5 * theme.spacing.unit
    },
    rememberContainer: {
        margin: 0,
    },
    submitButton: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
}))

export default function SignInFormLayout(props) {
    // Define styles
    const classes = SignInFormLayoutStyles()
    return (
        <FormGroup>
            <form onSubmit={(event) => props.onSubmit(event)}>
                <FormControl
                    fullWidth
                    className={classes.formControl}
                >
                    <InputLabel
                        variant='filled'
                        htmlFor='login'
                        error={props.isInvalidLogin}
                        className={classes.inputLabel}
                    >
                        Username
                    </InputLabel>
                    <FilledInput
                        fullWidth
                        required
                        name='login'
                        id='login'
                        onChange={(event) => props.onChange(event)}
                        classes={{
                            root: classes.input,
                            focused: 'focused',
                        }}
                        inputProps={{ className: classes.inputProps }}
                        error={props.isInvalidLogin}
                        startAdornment={
                            <React.Fragment>
                                <UsernameIcon className={classes.inputIcon} />
                                <Divider className={classes.divider} />
                            </React.Fragment>
                        }
                    />
                </FormControl>
                <FormControl
                    fullWidth
                    className={classes.formControl}
                >
                    <InputLabel
                        variant='filled'
                        htmlFor='password'
                        error={props.isInvalidLogin}
                        className={classes.inputLabel}
                    >
                        Password
                    </InputLabel>
                    <FilledInput
                        fullWidth
                        required
                        type={props.showPassword ? 'input' : 'password'}
                        name='password'
                        id='password'
                        onChange={(event) => props.onChange(event)}
                        classes={{
                            root: classes.input,
                            focused: 'focused',
                        }}
                        inputProps={{ className: classes.inputProps }}
                        error={props.isInvalidLogin}
                        startAdornment={
                            <React.Fragment>
                                <PasswordIcon className={classes.inputIcon} />
                                <Divider className={classes.divider} />
                            </React.Fragment>
                        }
                        endAdornment={
                            <IconButton onClick={props.onShowHidePassword}>
                                {props.showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
                            </IconButton>
                        }
                    />
                    {props.isInvalidLogin &&
                        <FormHelperText error>
                            Invalid username or password
                        </FormHelperText>
                    }
                </FormControl>
                <FormControlLabel
                    className={classes.rememberContainer}
                    control={
                        <Switch
                            id='remember'
                            // checked={state.checkedB}
                            // onChange={props.onRememberMeChange()}
                            value='remember'
                            color='secondary'
                        />
                    }
                    label='Remember me for 30 days'
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
        </FormGroup >
    )
}