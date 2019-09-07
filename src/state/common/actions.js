import * as types from './actionTypes';

export function showSpinner() {
  return {
    type: types.PROCESSING,
  };
}

export function hideSpinner() {
  return {
    type: types.STOP_PROCESSING,
  };
}

export function handleClose() {
  return {
    type: types.CLOSE_SNACKBAR,
  };
}

export function showError({ message }) {
  return {
    type: types.SHOW_ERROR,
    message,
  };
}
