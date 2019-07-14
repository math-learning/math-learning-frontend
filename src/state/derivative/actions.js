import * as types from './actionTypes';
import mathClient from '../../clients/mathClient';
import { cleanLatex } from '../../utils/latexUtils'

function exerciseFinished({ currentExpression, index }) {
  return {
    type: types.EXERCISE_FINISHED,
    currentExpression,
    index
  }
}

function stepIsValid({ currentExpression, index }) {
  return {
    type: types.STEP_IS_VALID,
    currentExpression,
    index
  };
}

function stepIsInvalid({index }) {
  return {
    type: types.STEP_IS_INVALID,
    index
  };
}

function contentChange({ content, index }) {
  return {
    type: types.CONTENT_CHANGE,
    content,
    index
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

export function validateStep({
  stepList,
  problemInput,
  lastExpression,
  result,
  problemIndex,
  currentExpression
}) {
  return async (dispatch, getState) => {
    // const state = getState();
    // const context = {}; // TODO: NECESITAMOS UN CONTEXT?

    // TODO: VALIDATE EXPRESSION HISTORY NO DEBERIA ESTAR ACA
    let expressionHistory = [cleanLatex(problemInput)];
    stepList.forEach(element => {
      expressionHistory.push(cleanLatex(element))
    });

    dispatch(processing())
    try {
      const data = await mathClient.validateNotInHistory(cleanLatex(currentExpression), expressionHistory);

      if (data) { // TODO: REMOVER ESTA COMPARACION
        const validationStep = {
          old_expression: cleanLatex(lastExpression),
          new_expression: cleanLatex(currentExpression)
        }
        const validationResponse = await mathClient.validateStep(validationStep);

        if (validationResponse) { // TODO: ESTO DEBERIA TIRAR TRUE O FALSE
          //TODO: handle
          const finished = await mathClient.compareExpressions(currentExpression, result)
          if (finished) {
            //TODO: handle
            alert("Resolviste el ejercicio correctamente!")  
            dispatch(exerciseFinished({ currentExpression, index: problemIndex }))
          } else {
            dispatch(stepIsValid({ currentExpression, index: problemIndex }))
          }

        } else {
          dispatch(stepIsInvalid({ currentExpression, index: problemIndex }))
        }
      } else {
        dispatch(stepIsInvalid({ currentExpression, index: problemIndex }))
      }
    } catch (e) {
      // TODO: Mostrar un mensaje de ocurrio un error por favor vuelva a intentar mas tarde.
    } finally {
      dispatch(stopProcessing())
    }
  };
}

export function changeContent({
  content,
  index
}) {
  return async (dispatch, getState) => {
    dispatch(contentChange({ content, index }))
  };
}
