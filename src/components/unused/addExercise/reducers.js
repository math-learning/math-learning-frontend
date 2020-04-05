import * as types from './actionTypes';

const initialState = {
  data: {
    expression: '',
    result: '',
  },
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.ADD_EXERCISE_EXPRESSION_CHANGE:
      return {
        ...state,
        data: {
          ...state.data,
          expression: action.newExpression,
        },
      };
    case types.ADD_EXERCISE_RESULT_CHANGE:
      return {
        ...state,
        data: {
          ...state.data,
          result: action.newResult,
        },
      };
    default:
      return state;
  }
}
