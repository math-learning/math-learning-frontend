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
        type: types.ADD_EXERCISE_ADD_EXERCISE,
        result,
        expression
    }
}

export function handleGetResult ({ expression }) {
    return async (dispatch, getState) => {
        try {
            let cleanLatexExpression = cleanLatex(expression);
            //dispatch(processing())
            const data = await mathClient.solveExercise(cleanLatexExpression);
            if (data) {
                console.log(data)
            } else {
                console.log("ERROR")
                console.log(data)
            }
        } catch (e) {
            //TODO
            console.log(e)
        }
    };
}

