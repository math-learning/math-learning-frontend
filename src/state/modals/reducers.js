import * as types from './actionTypes';

const initialState = {
  data: {
    modalType: null
  }
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        ...state,
        data: {
          modalType: action.modalType
        }
      };

    case types.HIDE_MODAL:
      return {
        ...state,
        data: {
          modalType: null
        }
      };

    default:
      return state;
  }
}
