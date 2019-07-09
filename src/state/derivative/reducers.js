import * as types from './actionTypes';

const initialState = {
  data: {
    isValidInput: true,
    currentExpression: '',
    stepList: [],
    isProcessing: false

  }
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.STEP_IS_VALID:
      return {
        ...state,
        data: {
          ...state.data,
          isValidInput: true,
          currentExpression: '',
          stepList: [...state.data.stepList, action.currentExpression]
        }
      };

    case types.STEP_IS_INVALID:
      return {
        ...state,
        data: {
          ...state.data,
          isValidInput: false
        }
      };
    
    case types.CONTENT_CHANGE:
      return {
        ...state,
        data: {
          ...state.data,
          isValidInput: true,
          currentExpression: action.content
        }
      }
    
    case types.PROCESSING:
      return {
        ...state,
        data: {
          ...state.data,
          isProcessing: true
        }
      }

    case types.STOP_PROCESSING:
        return {
          ...state,
          data: {
            ...state.data,
            isProcessing: false
          }
        }

    default:
      return state;
  }
}
