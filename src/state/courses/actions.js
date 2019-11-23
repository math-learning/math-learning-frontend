import { push } from 'connected-react-router';

import * as types from './actionTypes';
import * as commonSelectors from '../common/selectors';
import * as modalActions from '../modals/actions';
import messages from '../../configs/messages';
import configs from '../../configs/variables';

import coursesClient from '../../clients/coursesClient';

export function getCoursesSuccess({ courses }) {
  return {
    type: types.GET_COURSES_SUCCESS,
    courses
  };
}

export function listCoursesRequest() {
  return {
    type: types.LIST_COURSES_REQUEST
  };
}

export function listCoursesSuccess({ courses }) {
  return {
    type: types.LIST_COURSES_SUCCESS,
    courses
  };
}

export function joinCourseSuccess({ course }) {
  return {
    type: types.JOIN_COURSE_SUCCESS,
    course
  };
}

export function createCourseSuccess({ course }) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
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

export function addUserToCourse({
  course,
  password,
  userId,
  role
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    try {
      await coursesClient.addUserToCourse({
        context,
        courseId: course.courseId,
        password,
        userId,
        role
      });

      dispatch(joinCourseSuccess({ course }));
      dispatch(modalActions.hideModal());

      await dispatch(push(configs.paths.course(course.courseId)));
    } catch (err) {
      if (err.status === 409) {
        dispatch(modalActions.showError(messages.error.wrongPassword));
      }
    }
  };
}

export function searchCourses({ search }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    dispatch(listCoursesRequest());

    const courses = await coursesClient.searchCourses({ context, search });

    dispatch(listCoursesSuccess({ courses }));
  };
}

export function createCourse({ course }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    try {
      const createdCourse = await coursesClient.createCourse({ context, course });

      dispatch(createCourseSuccess({ course: createdCourse }));
      dispatch(modalActions.hideModal());

      await dispatch(push(configs.paths.course(createdCourse.courseId)));
    } catch (err) {
      if (err.status === 409) {
        dispatch(modalActions.showError(messages.error.courseAlreadyExist));
      }
    }
  };
}
