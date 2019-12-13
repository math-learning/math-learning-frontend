import * as types from './actionTypes';
import * as modalActions from '../modals/actions';
import * as commonSelectors from '../common/selectors';

import exercisesClient from '../../clients/exercisesClient';

export function resolveExerciseRequest({ courseId, guideId, exerciseId }) {
  return {
    type: types.RESOLVE_EXERCISE_REQUEST,
    courseId,
    guideId,
    exerciseId
  };
}

export function exerciseStepValid({ courseId, guideId, exerciseId, currentExpression }) {
  return {
    type: types.EXERCISE_STEP_IS_VALID,
    courseId,
    guideId,
    exerciseId,
    currentExpression
  };
}

export function exerciseStepIsValid({ courseId, guideId, exerciseId }) {
  return {
    type: types.EXERCISE_STEP_IS_INVALID,
    courseId,
    guideId,
    exerciseId
  };
}

export function exerciseResolved({ courseId, guideId, exerciseId, currentExpression }) {
  return {
    type: types.EXERCISE_RESOLVED,
    courseId,
    guideId,
    exerciseId,
    currentExpression
  };
}

export function getExerciseSuccess({
  courseId, guideId, exerciseId, exercise
}) {
  return {
    type: types.GET_EXERCISE_SUCCESS,
    courseId,
    guideId,
    exerciseId,
    exercise
  };
}

export function changeCurrentExpression({
  courseId,
  guideId,
  exerciseId,
  currentExpression
}) {
  return {
    type: types.EXPRESSION_CHANGE_SUCCESSFULLY,
    courseId,
    guideId,
    exerciseId,
    currentExpression
  };
}

export function createExerciseSuccess({ courseId, guideId, exercise }) {
  return {
    type: types.CREATE_EXERCISE_SUCCESS,
    courseId,
    guideId,
    exercise
  };
}

export function createExercise({ guideId, courseId, exercise }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    try {
      const createdExercise = await exercisesClient.createExercise({
        context,
        guideId,
        courseId,
        exercise
      });

      dispatch(createExerciseSuccess({ courseId, guideId, exercise: createdExercise }));
      dispatch(modalActions.hideModal());
    } catch (err) {
      dispatch(modalActions.showError(err.message));
    }
  };
}

export function getExercise({ guideId, courseId, exerciseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    try {
      const exercise = await exercisesClient.getExercise({
        context,
        guideId,
        courseId,
        exerciseId
      });

      dispatch(getExerciseSuccess({
        courseId, guideId, exerciseId, exercise
      }));
      dispatch(modalActions.hideModal());
    } catch (err) {
      dispatch(modalActions.showError(err.message));
    }
  };
}

export function resolveExercise({
  courseId,
  guideId,
  exerciseId,
  stepList,
  problemInput,
  lastExpression,
  currentExpression
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(resolveExerciseRequest({ courseId, guideId, exerciseId }));

    // setTimeout(() => { Used to test it
    //   // dispatch(exerciseStepIsValid({ courseId, guideId, exerciseId }));
    //   dispatch(exerciseStepValid({ courseId, guideId, exerciseId, currentExpression }));
    // }, 300);

    const result = await exercisesClient.resolveExercise({
      context,
      courseId,
      guideId,
      exerciseId,
      stepList,
      problemInput,
      lastExpression,
      currentExpression
    });

    if (result.status === 'valid') {
      dispatch(exerciseStepValid({ courseId, guideId, exerciseId, currentExpression }));
    } else if (result.status === 'resolved') {
      dispatch(exerciseResolved({ courseId, guideId, exerciseId, currentExpression }));
    } else {
      dispatch(exerciseStepIsValid({ courseId, guideId, exerciseId }));
    }
  };
}

