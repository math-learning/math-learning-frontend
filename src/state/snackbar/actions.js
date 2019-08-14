import * as types from './actionTypes';

export function handleClose() {
    return {
        type: types.CLOSE_SNACKBAR
    }
}

export function showError() {
    return {type: types.SHOW_ERROR}
}