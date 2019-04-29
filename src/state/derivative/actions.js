import * as types from './actionTypes';
import mathClient from '../../clients/mathClient';

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
    let expressionHistory = [problemInput];
    stepList.forEach(element => {
      expressionHistory.push(element)
    });
  
    const data = await mathClient.validateNotInHistory(currentExpression, expressionHistory);
  
    if( data ) { // TODO: REMOVER ESTA COMPARACION
      const validationStep = {
        old_expression: lastExpression,
        new_expression: currentExpression
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
  };
}

export function changeContent({
  content
}) {
  return async (dispatch, getState) => {
    dispatch(contentChange({ content }))
  };
}
 