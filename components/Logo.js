import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
// MUI components
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'

function LogoLogic(props) {
    // Set typography types
    const variant = {
        navbar: 'h6',
        sideMenu: 'h4',
        section: 'h4'
    }
    return (
        <LogoLayout
            logoStart='GOLDCOAST'
            logoEnd='MAIDS'
            noResize={props.noResize || undefined}
            align={props.align}
            variant={variant[props.variant]}
            background={props.background}
            anchorStyles={props.anchorStyles}
            typographyStyles={props.typographyStyles}
            onClick={props.onClick}
        />
    )
}

const logoStyles = makeStyles((theme) => ({
    anchor: {
        textDecoration: 'none',
    },
    allStyles: {
        fontFamily: "'Oswald', sans-serif",
        fontWeight: 400,
    },
    logoText: {
        color: theme.palette.primary.main,
    },
    logoText_End: {
        color: theme.palette.secondary.main
    },
    logoText__light: {
        color: theme.palette.primary.dark
    },
    logoText_End__light: {
        color: theme.palette.primary.contrastText,
        textShadow: theme.custom.palette.textShadow
    },
    noResize: {
        [theme.breakpoints.down('md')]: {
            fontSize: props => theme.typography[props.variant].fontSize
        }
    }
}))

function LogoLayout(props) {
    // Define styles
    const classes = logoStyles(props)
    // Switch style based on props.background
    let classLogoText
    let classLogoText_End
    switch (props.background) {
        case 'primary': {
            classLogoText = classes.logoText__light
            classLogoText_End = classes.logoText_End__light
            break
        }
        case 'primaryDark': {
            classLogoText = classes.logoText
            classLogoText_End = classes.logoText_End__light
            break
        }
        case 'primaryLight':
        default: {
            classLogoText = classes.logoText
            classLogoText_End = classes.logoText_End
        }
    }
    // If noResize === true, add noResize class
    const variantStyles = props.noResize ? classes.noResize : undefined
    return (
        <Link href='/'>
            <a
                className={classNames(classes.anchor, props.anchorStyles)}
                onClick={props.onClick}
            >
                <Typography
                    variant={props.variant}
                    component='span'
                    align={props.align || 'left'}
                    className={
                        classNames(
                            classes.allStyles,
                            classLogoText,
                            props.typographyStyles,
                            variantStyles
                        )
                    }
                >
                    {props.logoStart}
                    <span className={classNames(classLogoText_End, props.typographyStyles)}>
                        {props.logoEnd}
                    </span>
                </Typography>
            </a>
        </Link>
    )
}

export default LogoLogic