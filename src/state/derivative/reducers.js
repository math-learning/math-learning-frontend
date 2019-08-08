import * as types from './actionTypes';

const exercises = [
  {
    name: "e + sen",
    input: "\\frac{d\\left(e^x \\cdot \\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}",
    result: "e^x\\cdot \\left(1\ +x\\right)+ \\cos \\left(x\\right)\\cdot x^2+\\sin \\left(x\\right)\\cdot 2\\cdot x"
  },
  {
    name: "deriv suma x + x2 + cos",
    input: "\\frac{d\\left(x^2+x\\ +\\cos \\left(x\\right)\\right)}{dx}",
    result: "2*x+1-\\sin(x)"
  },
  {
    name: "sen / cos",
    input:"\\frac{d(\\frac{sen(x)}{\\cos(x)})} {dx}",
    result: "\\frac{1}{\\cos\\left(x\\right)^2}"
  },
  {
    name: "deriv of a constant",
    input: "\\frac{d(\\frac{ \\frac{d(sen(x))}{dx}}{\\cos(x)})} {dx}",
    // TODO:
    result: "0"
  },
  {
    name: "2 derivatives",
    input: " \\frac{d\\left(  \\frac{d\\left(e^x\\right)}{dx} \\right)}{dx}",
    result: "e^x"
  },
  {
    name: " e ",
    input: "\\frac{d\\left(e^x\\right)}{dx}",
    result: "e^x"
  },
  {
    name: "function composition",
    input: "\\frac{d\\left(      \\sin(\\cos(x))         \\right)}{dx}",
    result: "-\\cos (\\cos (x)) \\cdot \\sin(x)"
  },
  {
    name: "multiplication of 3 elem",
    input: "\\frac{d\\left(x^2 \\cdot \\sin(x) \\cdot \\cos \\left(x\\right)\\right)}{dx}",
    //TODO
    result: "\\frac{d\\left(e^3  \\cdot x \\right)}{dx}"
  },
  {
    name: "constant times x",
    input: "\\frac{d\\left(e^3  \\cdot x \\right)}{dx}",
    result: "e^3"
  }

]

const exercisesAmount = exercises.length

const initialState = {
  data: {
    isValidInput: new Array(exercisesAmount).fill(true),
    currentExpression: new Array(exercisesAmount).fill(""),
    stepList: new Array(exercisesAmount).fill([]),
    isProcessing: false,
    finishedExercises: [],
    showFinishedExercise: false,
    exercises
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
    
    case types.ADD_EXERCISE:
      const exercise = {
        name: "name",
        input: action.expression,
        result: action.result
      }
      return {
        ...state,
        data: {
          ...state.data,
          exercises: [
            ...exercises,
            exercise
          ]
        }
      }
        

    default:
      return state;
  }
}
