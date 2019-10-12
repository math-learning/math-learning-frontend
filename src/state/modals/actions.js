import * as types from './actionTypes';

export const loadModal = (modalType) => {
  return {
    type: types.SHOW_MODAL,
    modalType
  };
};

export const hideModal = () => {
  return {
    type: types.HIDE_MODAL
  };
};
