import { push } from 'connected-react-router';

import usersClient from '../../clients/usersClient';
import messages from '../../configs/messages';
import configs from '../../configs/variables';
import * as modalActions from '../modals/actions';
import * as types from './actionTypes';
import * as selectors from './selectors';

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

export function logoutSucess() {
  return {
    type: types.LOGOUT_SUCCESS
  };
}

export function loginSuccess({ userProfile }) {
  return {
    type: types.LOGIN_SUCCESS,
    userProfile
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

export function signUp({ name, role }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = selectors.context(state);

    try {
      const userProfile = await usersClient.signup({ context, name, role });
      dispatch(signUpSuccess({ userProfile }));
      dispatch(modalActions.hideModal());

      await dispatch(push(configs.paths.courses));
    } catch (err) {
      if (err.status === 409) {
        dispatch(modalActions.showError(messages.error.userAlreadyExist));
      }
    }
  };
}

export function login(props) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = selectors.context(state);
    const pathToRedirect = (props && props.nextPath) || configs.paths.courses;

    try {
      const userProfile = await usersClient.login({ context });
      dispatch(loginSuccess({ userProfile }));
      dispatch(modalActions.hideModal());

      await dispatch(push(pathToRedirect));
    } catch (err) {
      if (err.status === 404) {
        dispatch(modalActions.showError(messages.error.userDoesNotExist));
      }
    }
  };
}

export function logout() {
  return async (dispatch) => {
    await dispatch(push(configs.paths.main));

    dispatch(logoutSucess());
  };
}
