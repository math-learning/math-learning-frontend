import * as types from './actionTypes';
import * as modalTypes from '../modals/actionTypes';
import * as selectors from './selectors';
import usersClient from '../../clients/usersClient';

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

export function hideModal() {
  return {
    type: modalTypes.HIDE_MODAL
  };
}

export function loginSuccess({ userProfile }) {
  return {
    type: types.LOGIN_SUCCESS,
    userProfile
  };
}

export function loginFail() {
  return {
    type: types.LOGIN_FAIL
  };
}

export function onGoogleLogin({ accessToken }) {
  return {
    type: types.GOOGLE_LOGIN_SUCCESS,
    accessToken
  };
}

export function signUpSuccess({ userProfile }) {
  return {
    type: types.SIGNUP_SUCCESS,
    userProfile
  };
}

export function signUpFail() {
  return {
    type: types.SIGNUP_FAIL
  };
}

export function signUp({ name, rol }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = selectors.context(state);

    try {
      const userProfile = await usersClient.signup({ context, name, rol });
      dispatch(signUpSuccess({ userProfile }));
      dispatch(hideModal());
    } catch (err) {
      dispatch(signUpFail());
    }
  };
}

export function login() {
  return async (dispatch, getState) => {
    const state = getState();
    const context = selectors.context(state);

    try {
      const userProfile = await usersClient.login({ context });
      dispatch(loginSuccess({ userProfile }));
      dispatch(hideModal());
    } catch (err) {
      dispatch(loginFail());
    }
  };
}
