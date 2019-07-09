import * as types from './actionTypes';
import mathClient from '../../clients/mathClient';
import { cleanLatex } from '../../utils/latexUtils'


function stepIsValid({ currentExpression }) {
  return {
    type: types.STEP_IS_VALID,
    currentExpression
  };
}

function stepIsInvalid() {
  return {
    type: types.STEP_IS_INVALID
  };
}

function contentChange({ content }) {
  return {
    type: types.CONTENT_CHANGE,
    content
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
          dispatch(stepIsValid({ currentExpression }))
        } else {
          dispatch(stepIsInvalid({ currentExpression }))
        }
      } else {
        dispatch(stepIsInvalid({ currentExpression }))
      }
    } catch (e) {
      // TODO: Mostrar un mensaje de ocurrio un error por favor vuelva a intentar mas tarde.
    } finally {
      dispatch(stopProcessing())
    }
  };
}

export function changeContent({
  content
}) {
  return async (dispatch, getState) => {
    dispatch(contentChange({ content }))
  };
}
