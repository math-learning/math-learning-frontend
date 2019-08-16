import * as types from './actionTypes';

export function handleClose() {
    return {
        type: types.CLOSE_SNACKBAR
    }
}

export function showError({message}) {
    return {
        type: types.SHOW_ERROR,
        message
    }
}