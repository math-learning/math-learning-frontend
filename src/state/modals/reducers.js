import * as types from './actionTypes';

const initialState = {
  data: {
    modalType: null,
    modalError: null,
    modalParams: null,
    isActionLoading: false
  }
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        ...state,
        data: {
          ...state.data,
          modalType: action.modalType,
          modalParams: action.modalParams,
          isActionLoading: false
        }
      };

    case types.HIDE_MODAL:
      return {
        ...state,
        data: {
          ...state.data,
          modalType: null,
          modalParams: null,
          isActionLoading: false
        }
      };

    case types.SHOW_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          modalError: action.error,
          isActionLoading: false
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

    case types.SHOW_SPINNER:
      return {
        ...state,
        data: {
          ...state.data,
          isActionLoading: true
        }
      };

    case types.HIDE_SPINNER:
      return {
        ...state,
        data: {
          ...state.data,
          isActionLoading: false
        }
      };

    default:
      return state;
  }
}
