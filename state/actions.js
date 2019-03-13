//
// Action types
// :::::::::::::::
//
// Handle click events
export const HANDLE_CLICK = 'HANDLE_CLICK'
// Handle snackbar open
export const OPEN_SNACKBAR = 'OPEN_SNACKBAR'
// Handle snackbar close
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

//
// Action creators
// ::::::::::::::::::
//
// Hande click events
export function handleClick(stateType, value, event) {
    return {
        type: HANDLE_CLICK,
        payload: {
            stateType: stateType,
            value: value,
            event: event
        }
    }
}
// Hande snackbar open
export function openSnackbar(open, variant, message, undo, showUndo) {
    return {
        type: OPEN_SNACKBAR,
        payload: {
            open: open,
            variant: variant,
            message: message,
            undo: undo,
            showUndo: showUndo
        }
    }
}

// Handle snackbar close
export function closeSnackbar() {
    return {
        type: CLOSE_SNACKBAR,
        payload: {
            open: false,
            variant: '',
            message: '',
            undo: '',
            showUndo: ''
        }
    }
}