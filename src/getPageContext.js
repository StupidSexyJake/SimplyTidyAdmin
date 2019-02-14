import { SheetsRegistry } from 'jss'
import { createMuiTheme } from '@material-ui/core/styles'
import { createGenerateClassName } from '@material-ui/styles'
import orange from '@material-ui/core/colors/orange'
import cyan from '@material-ui/core/colors/cyan'
import blueGrey from '@material-ui/core/colors/blueGrey'

// HEX to RGBA converter
function hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")"
    } else {
        return "rgba(" + r + ", " + g + ", " + b + ", 1)"
    }
}

// Hardcoded values for theme customization
const defaultTheme = createMuiTheme({
    palette: {
        primary: {
            light: cyan[50],
            main: cyan[500],
            dark: cyan[900],
            contrastText: hexToRGB('#ffffff', 0.95)
        },
        secondary: {
            light: orange[50],
            main: orange[700],
            dark: orange[900],
            contrastText: hexToRGB('#ffffff', 0.95)
        },
        text: {
            primary: hexToRGB(blueGrey[900], 0.87),
            secondary: hexToRGB(blueGrey[900], 0.6),
        }
    },
    typography: {
        useNextVariants: true,
        fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif'
    },
    custom: {
        palette: {
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        },
        typography: {
            allHeadings: {
                fontFamily: '"Montserrat", "Open Sans", "Helvetica", "Arial", sans-serif',
                paddingBottom: 2, // will be calculated as value * theme.spacing.unit
                textAlign: 'center',
            },
            allBody: {
            }
        }
    }
})

// Main theme style
const myTheme = createMuiTheme({
    ...defaultTheme,
    overrides: {
        MuiButton: {
            text: {
                minHeight: '48px',
                minWidth: '48px',
                paddingLeft: 2 * defaultTheme.spacing.unit,
                paddingRight: 2 * defaultTheme.spacing.unit,
                '&:hover': {
                    color: defaultTheme.palette.primary.dark,
                    marginTop: '-2px'
                }
            },
            containedPrimary: {
                textShadow: defaultTheme.custom.palette.textShadow
            },
            containedSecondary: {
                textShadow: defaultTheme.custom.palette.textShadow
            },
            extendedFab: {
                border: defaultTheme.spacing.unit
            }
        },
        MuiFab: {
            extended: {
                height: 'auto',
                padding: '8px 24px',
                fontSize: '0.9375rem',
                borderRadius: defaultTheme.shape.borderRadius,
                '&$sizeSmall': {
                    borderRadius: defaultTheme.shape.borderRadius
                },
                '&$sizeMedium': {
                    borderRadius: defaultTheme.shape.borderRadius
                },
            }
        },
        MuiAppBar: {
            colorDefault: {
                backgroundColor: defaultTheme.palette.background.default
            }
        }
    },
    palette: {
        ...defaultTheme.palette,
    },
    typography: {
        ...defaultTheme.typography,
        h1: {
            fontSize: '4.5rem',
            fontFamily: defaultTheme.custom.typography.allHeadings.fontFamily,
            textAlign: defaultTheme.custom.typography.allHeadings.textAlign,
            paddingBottom: defaultTheme.custom.typography.allHeadings.paddingBottom * defaultTheme.spacing.unit,
            color: hexToRGB(defaultTheme.palette.primary.dark, 0.95),
        },
        h2: {
            fontFamily: defaultTheme.custom.typography.allHeadings.fontFamily,
            textAlign: defaultTheme.custom.typography.allHeadings.textAlign,
            paddingBottom: defaultTheme.custom.typography.allHeadings.paddingBottom * defaultTheme.spacing.unit,
            color: hexToRGB(defaultTheme.palette.primary.dark, 0.95),
        },
        h3: {
            fontFamily: defaultTheme.custom.typography.allHeadings.fontFamily,
            textAlign: defaultTheme.custom.typography.allHeadings.textAlign,
            paddingBottom: defaultTheme.custom.typography.allHeadings.paddingBottom * defaultTheme.spacing.unit,
            color: hexToRGB(defaultTheme.palette.primary.dark, 0.95),
        },
        h4: {
            fontFamily: defaultTheme.custom.typography.allHeadings.fontFamily,
            textAlign: defaultTheme.custom.typography.allHeadings.textAlign,
            paddingBottom: defaultTheme.custom.typography.allHeadings.paddingBottom * defaultTheme.spacing.unit,
            color: hexToRGB(defaultTheme.palette.primary.dark, 0.95),
        },
        h5: {
            fontFamily: defaultTheme.custom.typography.allHeadings.fontFamily,
            textAlign: defaultTheme.custom.typography.allHeadings.textAlign,
            color: hexToRGB(defaultTheme.palette.primary.main, 0.95),
        },
        h6: {
            fontFamily: defaultTheme.custom.typography.allHeadings.fontFamily,
            textAlign: defaultTheme.custom.typography.allHeadings.textAlign,
            color: hexToRGB(defaultTheme.palette.primary.main, 0.95),
        },
    },
})

// Final theme with breakpoint styling
const theme = createMuiTheme({
    ...myTheme,
    typography: {
        ...myTheme.typography,
        h1: {
            ...myTheme.typography.h1,
            [myTheme.breakpoints.down('sm')]: {
                ...myTheme.typography.h2
            }
        },
        h2: {
            ...myTheme.typography.h2,
            [myTheme.breakpoints.down('sm')]: {
                ...myTheme.typography.h4,
                marginBottom: 2 * myTheme.spacing.unit,
            }
        },
        h3: {
            ...myTheme.typography.h3,
            [myTheme.breakpoints.down('sm')]: {
                ...myTheme.typography.h4
            }
        },
        h4: {
            ...myTheme.typography.h4,
            [myTheme.breakpoints.down('sm')]: {
                ...myTheme.typography.h5,
                color: hexToRGB(defaultTheme.palette.primary.dark, 0.95),
            }
        },
        h5: {
            ...myTheme.typography.h5,
            [myTheme.breakpoints.down('sm')]: {
                ...myTheme.typography.h6
            }
        },
        h6: {
            [myTheme.breakpoints.down('sm')]: {
                ...myTheme.typography.subtitle1,
                color: myTheme.typography.h6.color
            }
        }
    }
})

function createPageContext() {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName(),
    }
}

let pageContext;

export default function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext()
    }

    // Reuse context on the client-side.
    if (!pageContext) {
        pageContext = createPageContext()
    }

    return pageContext;
}
