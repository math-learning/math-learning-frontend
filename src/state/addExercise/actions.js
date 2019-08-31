import * as types from './actionTypes';
import { cleanLatex } from '../../utils/latexUtils';
import mathClient from '../../clients/mathClient';

export function handleAddExpressionChange ({newExpression}) {
    return {
        type: types.ADD_EXERCISE_EXPRESSION_CHANGE,
        newExpression
    }
}

export function handleAddResultChange({newResult}) {
    return {
        type: types.ADD_EXERCISE_RESULT_CHANGE,
        newResult
    }
}

export function handleAddExercise({result, expression}) {
    return {
        type: types.ADD_EXERCISE,
        result: result.toString(),
        expression
    }
}

function processing() {
    return {
      type: types.PROCESSING
    }
  }

function stopProcessing() {
    return {
        type: types.STOP_PROCESSING
    }
}


export function handleGetResult ({ expression }) {
    return async (dispatch, getState) => {
        try {
            let cleanLatexExpression = cleanLatex(expression);
            dispatch(processing())
            const data = await mathClient.solveExercise(cleanLatexExpression);
            if (data) {
                dispatch(stopProcessing())
                dispatch(handleAddResultChange({newResult: data}))
            } else {
                alert("ERROR")
                dispatch(stopProcessing())
                console.log(data)
            }
        } catch (e) {
            //TODO
            dispatch(stopProcessing())
            console.log(e)
        }
    };
}

