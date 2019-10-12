import * as types from './actionTypes';

export const loadModal = (modalType) => ({
  type: types.SHOW_MODAL,
  modalType
});

export const hideModal = () => ({
  type: types.HIDE_MODAL
});

export const hideError = () => ({
  type: types.HIDE_ERROR
});

export const showError = (error) => ({
  type: types.SHOW_ERROR,
  error
});
