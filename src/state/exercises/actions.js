import * as types from './actionTypes';
import * as modalActions from '../modals/actions';
import * as commonSelectors from '../common/selectors';
import * as exerciseSelectors from './selectors';

import exercisesClient from '../../clients/exercisesClient';

export function getExercisesSuccess({ courseId, guideId, exercises }) {
  return {
    type: types.GET_EXERCISES_SUCCESS,
    courseId,
    guideId,
    exercises
  };
}

export function getExercisesRequest() {
  return {
    type: types.GET_EXERCISES_REQUEST,
  };
}

export function resolveExerciseRequest({ courseId, guideId, exerciseId }) {
  return {
    type: types.RESOLVE_EXERCISE_REQUEST,
    courseId,
    guideId,
    exerciseId
  };
}

export function updateExercise({
  courseId, guideId, exerciseId, exercise
}) {
  return {
    type: types.UPDATE_EXERCISE,
    courseId,
    guideId,
    exerciseId,
    exercise
  };
}

export function removeExerciseStep({
  courseId, guideId, exerciseId
}) {
  return {
    type: types.REMOVE_EXERCISE_STEP,
    courseId,
    guideId,
    exerciseId
  };
}

export function removeExerciseDetail({
  courseId, guideId, exerciseId
}) {
  return {
    type: types.REMOVE_EXERCISE_DETAIL,
    courseId,
    guideId,
    exerciseId
  };
}

export function exerciseStepValid({
  courseId, guideId, exerciseId, currentExpression
}) {
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

export function exerciseResolved({
  courseId, guideId, exerciseId, currentExpression
}) {
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

      dispatch(createExerciseSuccess({
        courseId,
        guideId,
        exerciseId: createdExercise.exerciseId,
        exercise: createdExercise,
      }));
      dispatch(modalActions.hideModal());
    } catch (err) {
      dispatch(modalActions.showError(err.message));
    }
  };
}

export function deleteExerciseStep({
  guideId, courseId, exerciseId
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const currentExercise = exerciseSelectors.getExercise(state, { courseId, guideId, exerciseId });

    dispatch(removeExerciseStep({ courseId, guideId, exerciseId }));
    dispatch(modalActions.hideModal());

    try {
      await exercisesClient.removeExerciseStep({
        context, guideId, courseId, exerciseId
      });
    } catch (err) {
      // back to the previous state
      dispatch(updateExercise({
        courseId, guideId, exerciseId, exercise: currentExercise
      }));
    }
  };
}

export function getExercises({ courseId, guideId }) {
  return async (dispatch, getState) => {
    try {
      dispatch(getExercisesRequest());
      const state = getState();
      const context = commonSelectors.context(state);
      const exercises = await exercisesClient.getExercises({ context, courseId, guideId });
      dispatch(getExercisesSuccess({ courseId, guideId, exercises }));
    } catch (err) {
      // TODO: handle
      alert('ha ocurrido un error inesperado, por favor vuelve a intentar luego');
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
  currentExpression
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(resolveExerciseRequest({ courseId, guideId, exerciseId }));

    const result = await exercisesClient.resolveExercise({
      context,
      courseId,
      guideId,
      exerciseId,
      currentExpression
    });

    if (result.exerciseStatus === 'valid') {
      dispatch(exerciseStepValid({
        courseId, guideId, exerciseId, currentExpression
      }));
    } else if (result.exerciseStatus === 'resolved') {
      dispatch(exerciseResolved({
        courseId, guideId, exerciseId, currentExpression
      }));
    } else {
      dispatch(exerciseStepIsValid({ courseId, guideId, exerciseId }));
    }
  };
}

function deleteExerciseRequest({ courseId, guideId, exerciseId }) {
  return {
    type: types.DELETE_EXERCISE_REQUEST,
    courseId,
    guideId,
    exerciseId,
  };
}

function deleteExerciseSuccess({ courseId, guideId, exerciseId }) {
  return {
    type: types.DELETE_EXERCISE_SUCCESS,
    courseId,
    guideId,
    exerciseId,
  };
}

export function deleteExercise({
  courseId,
  guideId,
  exerciseId,
}) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const context = commonSelectors.context(state);
      dispatch(deleteExerciseRequest({ courseId, guideId, exerciseId }));
      const result = await exercisesClient.deleteExercise({
        context, courseId, guideId, exerciseId
      });
      if (result) {
        // TODO: handle
        dispatch(deleteExerciseSuccess({ courseId, guideId, exerciseId }));
      }
      dispatch(modalActions.hideModal());
    } catch (err) {
      // TODO: handle
      dispatch(modalActions.showError(err.message));
    }
  };
}

export function updateExerciseAsProfessor({
  courseId,
  guideId,
  exerciseId,
  exercise
}) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const context = commonSelectors.context(state);
      // TODO
      const updatedExercise = await exercisesClient.updateExerciseAsProfessor({
        context, courseId, guideId, exerciseId, exercise
      });
      if (updatedExercise) {
        // TODO: handle
        dispatch(updateExercise({
          courseId, guideId, exerciseId, exercise
        }));
        // TODO: check if it is the best approach
        dispatch(removeExerciseDetail({ courseId, guideId, exerciseId }));
      }
      dispatch(modalActions.hideModal());
    } catch (err) {
      // TODO: handle
      dispatch(modalActions.showError(err.message));
    }
  };
}
