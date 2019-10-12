import * as types from './actionTypes';

const initialState = {
  data: {
    modalType: null,
    modalError: null
  }
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        ...state,
        data: {
          ...state.data,
          modalType: action.modalType
        }
      };

    case types.HIDE_MODAL:
      return {
        ...state,
        data: {
          ...state.data,
          modalType: null
        }
      };

    case types.SHOW_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          modalError: action.error
        }
      };

    case types.HIDE_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          modalError: null
        }
      };

    default:
      return state;
  }
}
