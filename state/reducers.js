// Import actions
import {
    HANDLE_CLICK,
    OPEN_SNACKBAR,
    CLOSE_SNACKBAR,
    RESET_STATE,
} from './actions'

// Set initial state values
export const initialState = {
    user: {
        login: 0,
        password: 0,
        remember: false,
        showPassword: false,
        invalidLogin: false,
    },
    navigation: {
        services: false
    },
    dialog: {
        forgotPassword: false,
        teamCreate: false,
        teamUpdate: false,
        teamUpdateMultiple: false,
        teamDelete: false,
        teamDeleteMultiple: false,
    },
    checkbox: {
        teamDelete: false
    },
    snackbar: {
        open: false,
        variant: '',
        message: '',
        undo: '',
        showUndo: false
    },
    listTeams: {
        allTeams: [],
        order: 'asc',
        orderBy: 'name',
        selected: [],
        searchTerm: ''
    },
    selected: {
        team: {},
        createTeam: {}
    }
}

// Create reducer
const reducer = (state, action) => {
    const reduced = { ...state }
    switch (action.type) {
        case HANDLE_CLICK:
            return Object.assign({}, state, {
                ...reduced,
                [action.payload.stateType]: {
                    ...reduced[action.payload.stateType],
                    [action.payload.value]: action.payload.event
                }
            })
        case OPEN_SNACKBAR:
        case CLOSE_SNACKBAR:
            return Object.assign({}, state, {
                ...reduced,
                snackbar: {
                    ...reduced.snackbar,
                    open: action.payload.open,
                    variant: action.payload.variant,
                    message: action.payload.message,
                    undo: action.payload.undo,
                    showUndo: action.payload.showUndo
                }
            })
        case RESET_STATE:
            return Object.assign({}, state, {
                ...reduced,
                [action.payload.stateType]: {
                    ...initialState[action.payload.stateType]
                }
            })
        default: state
    }
}

export default reducer