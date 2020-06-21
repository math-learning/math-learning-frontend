import * as types from './actionTypes';
import * as commonSelectors from '../common/selectors';
import coursesClient from '../../clients/coursesClient';
import exercisesClient from '../../clients/exercisesClient';

export function getCourseUsersActivitySuccess({ courseId, statistics }) {
  return {
    type: types.GET_COURSE_USERS_ACTIVITY_SUCCESS,
    courseId,
    statistics
  };
}

export function getCourseUsersActivity({ courseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const statistics = await coursesClient.getCourseUsersActivity({ context, courseId });

    dispatch(getCourseUsersActivitySuccess({ courseId, statistics }));
  };
}

export function getCourseExerciseErrorsSuccess({ courseId, statistics }) {
  return {
    type: types.GET_COURSE_EXECISE_ERRORS_SUCCESS,
    courseId,
    statistics
  };
}

export function getCourseExerciseStepCountSuccess({ courseId, statistics }) {
  return {
    type: types.GET_COURSE_EXECISE_STEP_COUNT_SUCCESS,
    courseId,
    statistics
  };
}

export function getUsersQualificationsSuccess({ courseId, statistics }) {
  return {
    type: types.GET_USERS_QUALIFICATIONS_SUCCESS,
    courseId,
    statistics
  };
}

export function getCourseExerciseErrors({ courseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const statistics = await exercisesClient.getExerciseErrors({ context, courseId });

    dispatch(getCourseExerciseErrorsSuccess({ courseId, statistics }));
  };
}

export function getCourseExerciseStepCount({ courseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const statistics = await exercisesClient.getExerciseStepCount({ context, courseId });

    dispatch(getCourseExerciseStepCountSuccess({ courseId, statistics }));
  };
}

export function getUsersQualifications({ courseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const statistics = await exercisesClient.getUsersQualifications({ context, courseId });

    dispatch(getUsersQualificationsSuccess({ courseId, statistics }));
  };
}
