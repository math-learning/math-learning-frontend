import createThunkErrorHandlerMiddleware from 'redux-thunk-error-handler';
import * as commonSelectors from '../state/common/selectors';
import * as modalActions from '../state/modals/actions';
import * as modalTypes from '../state/modals/modalTypes';
import * as logger from '../utils/logger';

const logoutThunk = async (dispatch, getState) => {
  const state = getState();
  const nextPath = commonSelectors.currentPath(state);

  dispatch(modalActions.loadModal(modalTypes.SESSION_EXPIRED_MODAL, { nextPath }));
};

const errorHandler = (err) => {
  logger.onError('Error has been handled', err);

  if (err.status === 401) {
    return logoutThunk;
  }
  return null;
};

export default createThunkErrorHandlerMiddleware({ onError: errorHandler });
