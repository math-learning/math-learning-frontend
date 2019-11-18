import * as types from './actionTypes';
import * as commonSelectors from '../common/selectors';

import coursesClient from '../../clients/coursesClient';

export function getCoursesSuccess({ courses }) {
  return {
    type: types.GET_COURSES_SUCCESS,
    courses
  };
}

export function getCourses() {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const courses = await coursesClient.getCourses({ context });

    dispatch(getCoursesSuccess({ courses }));
  };
}
