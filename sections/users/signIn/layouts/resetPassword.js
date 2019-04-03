import React from 'react'
// MUI Components
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FilledInput from '@material-ui/core/FilledInput'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
// Icons
import PasswordIcon from '@material-ui/icons/Lock'
import ShowPasswordIcon from '@material-ui/icons/Visibility'
import HidePasswordIcon from '@material-ui/icons/VisibilityOff'

// Create Index styles
const resetPasswordFormLayoutStyles = makeStyles(theme => ({
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

export default function ResetPasswordFormLayout(props) {
    // Define styles
    const classes = resetPasswordFormLayoutStyles()
    return (
        <FormGroup>
            <form onSubmit={(event) => props.onSubmit(event)}>
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
                </FormControl>
                <FormControl
                    fullWidth
                    className={classes.formControl}
                >
                    <InputLabel
                        variant='filled'
                        htmlFor='confirmPassword'
                        error={props.isInvalidLogin}
                        className={classes.inputLabel}
                    >
                        Confirm Password
                    </InputLabel>
                    <FilledInput
                        fullWidth
                        required
                        type={props.showPassword ? 'input' : 'password'}
                        name='confirmPassword'
                        id='confirmPassword'
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
                            Passwords do not match
                        </FormHelperText>
                    }
                </FormControl>
                <Button
                    fullWidth
                    type='submit'
                    variant='contained'
                    color='secondary'
                    disabled={props.isLoginDisabled}
                    className={classes.submitButton}
                    size='large'
                >
                    Sign In
                </Button>
            </form>
        </FormGroup >
    )
}