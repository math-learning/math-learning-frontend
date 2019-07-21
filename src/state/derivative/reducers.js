import * as types from './actionTypes';

const exercisesAmount = 9

const initialState = {
  data: {
    isValidInput: new Array(exercisesAmount).fill(true),
    currentExpression: new Array(exercisesAmount).fill(''),
    stepList: new Array(exercisesAmount).fill([]),
    isProcessing: false,
    finishedExercises: [],
    showFinishedExercise: false
  }
};

export default function reducers(state = initialState, action) {
  const index = action.index;

  const stepList = [...state.data.stepList];
  const currentExpression = [...state.data.currentExpression];
  const isValidInput = [...state.data.isValidInput];

  switch (action.type) {    
    case types.STEP_IS_VALID:
      
      stepList[index] = [...state.data.stepList[index], action.currentExpression];
      currentExpression[index] = ''
      isValidInput[index] = true

      return {
        ...state,
        data: {
          ...state.data,
          isValidInput,
          currentExpression,
          stepList
        }
      };

    case types.STEP_IS_INVALID:
      isValidInput[index] = false
      return {
        ...state,
        data: {
          ...state.data,
          isValidInput
        }
      };
    
    case types.CONTENT_CHANGE:
      currentExpression[index] = action.content
      isValidInput[index] = true
      return {
        ...state,
        data: {
          ...state.data,
          isValidInput,
          currentExpression
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
    
    case types.EXERCISE_FINISHED:
      isValidInput[index] = true
      currentExpression[index] = ''
      stepList[index] = [...state.data.stepList[index], action.currentExpression]

      return {
        ...state,
        data: {
          ...state.data,
          isValidInput,
          currentExpression,
          stepList,
          finishedExercises: [...state.data.finishedExercises, action.index],
          showFinishedExercise: true
        }
      }
    
    case types.CLOSE_SOLVED_DIALOG:
        return {
          ...state,
          data: {
            ...state.data,
            showFinishedExercise: false
          }
        }

    default:
      return state;
  }
}
