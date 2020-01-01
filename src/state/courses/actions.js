import { push } from 'connected-react-router';

import * as types from './actionTypes';
import * as commonSelectors from '../common/selectors';
import * as modalActions from '../modals/actions';
import messages from '../../configs/messages';
import configs from '../../configs/variables';
import * as common from '../common';

import coursesClient from '../../clients/coursesClient';

export function getCoursesSuccess({ courses }) {
  return {
    type: types.GET_COURSES_SUCCESS,
    courses
  };
}

export function updateCourseSuccess({ course }) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
}

export function getCourseSuccess({ course }) {
  return {
    type: types.GET_COURSE_DETAIL_SUCCESS,
    course
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

export function deleteCourseRequest({ courseId }) {
  return {
    type: types.DELETE_COURSE_REQUEST,
    courseId,
  };
}

export function update({ courseId, updatedValues }) {
  return async (dispatch, getState) => {
    dispatch(common.actions.showSpinner());
    const state = getState();
    const context = commonSelectors.context(state);
    const newCourse = {
      ...state.courses.data.detail[courseId],
      ...updatedValues,
    };
    const course = await coursesClient.updateCourse({ context, course: newCourse });
    dispatch(updateCourseSuccess({ course }));
    dispatch(common.actions.hideSpinner());
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

export function getCourse({ courseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const course = await coursesClient.getCourse({ context, courseId });

    dispatch(getCourseSuccess({ course }));
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

      await dispatch(push(configs.pathGenerators.course(course.courseId)));
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

      await dispatch(push(configs.pathGenerators.course(createdCourse.courseId)));
    } catch (err) {
      if (err.status === 409) {
        dispatch(modalActions.showError(messages.error.courseAlreadyExist));
      }
    }
  };
}

export function deleteCourse({ courseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    try {
      dispatch(deleteCourseRequest({ courseId }));
      dispatch(push(configs.paths.courses));
      const response = await coursesClient.deleteCourse({ context, courseId });
    } catch (e) {
      // TODO: handle
      console.log(e)
    } finally {
      dispatch(modalActions.hideModal());
    }
  };
}
