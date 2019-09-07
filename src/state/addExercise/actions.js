import * as types from './actionTypes';
import { cleanLatex } from '../../utils/latexUtils';
import mathClient from '../../clients/mathClient';
import * as common from '../common'

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
    if (result === '' || expression === '') {
        return common.actions.showError({message: "Por favor complete todos los campos antes de continuar"});
    }
    return {
        type: types.ADD_EXERCISE,
        result: result.toString(),
        expression
    }
}



export function handleGetResult ({ expression }) {
    return async (dispatch, getState) => {
        
        try {
            if( expression === null || expression === '') {
                dispatch(common.actions.showError({message: "La expresion ingresada es invalida"}));
                return;
            }
            dispatch(common.actions.showSpinner());
            let cleanLatexExpression = cleanLatex(expression);
            const data = await mathClient.solveExercise(cleanLatexExpression);
            if (data) {
                dispatch(handleAddResultChange({newResult: data}))
            } else {
                console.log(data)
                throw Error()
            }
        } catch (e) {
            //TODO
            console.log(e)
        } finally {
            dispatch(common.actions.hideSpinner());
        }
    };
}

