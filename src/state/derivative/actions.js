import * as types from './actionTypes';
import mathClient from '../../clients/mathClient';
import { cleanLatex } from '../../utils/latexUtils';
import * as common from '../common';

function exerciseFinished({ currentExpression, index }) {
  return {
    type: types.EXERCISE_FINISHED,
    currentExpression,
    index,
  };
}

export function closeExerciseSolvedDialog() {
  return {
    type: types.CLOSE_SOLVED_DIALOG,
  };
}

function stepIsValid({ currentExpression, index }) {
  return {
    type: types.STEP_IS_VALID,
    currentExpression,
    index,
  };
}

function stepIsInvalid({ index }) {
  return {
    type: types.STEP_IS_INVALID,
    index,
  };
}

function contentChange({ content, index }) {
  return {
    type: types.CONTENT_CHANGE,
    content,
    index,
  };
}

export function validateStep({
  stepList,
  problemInput,
  lastExpression,
  result,
  problemIndex,
  currentExpression,
}) {
  return async (dispatch) => {
    try {
      dispatch(common.actions.showSpinner());

      const expressionHistory = [cleanLatex(problemInput)];
      stepList.forEach((element) => {
        expressionHistory.push(cleanLatex(element));
      });

      const data = await mathClient.validateNotInHistory(cleanLatex(currentExpression), expressionHistory);

      if (data) {
        const validationStep = {
          old_expression: cleanLatex(lastExpression),
          new_expression: cleanLatex(currentExpression),
        };
        const validationResponse = await mathClient.validateStep(validationStep);

        if (validationResponse) {
          const finished = await mathClient.compareExpressions(currentExpression, result);
          if (finished) {
            dispatch(exerciseFinished({ currentExpression, index: problemIndex }));
          } else {
            dispatch(stepIsValid({ currentExpression, index: problemIndex }));
          }
          return;
        }
        dispatch(stepIsInvalid({ currentExpression, index: problemIndex }));
      } else {
        dispatch(stepIsInvalid({ currentExpression, index: problemIndex }));
      }
    } finally {
      dispatch(common.actions.hideSpinner());
    }
  };
}

export function changeContent({
  content,
  index,
}) {
  return async (dispatch) => {
    dispatch(contentChange({ content, index }));
  };
}
