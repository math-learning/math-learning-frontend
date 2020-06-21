import { push } from 'connected-react-router';
import * as types from './actionTypes';
import * as selectors from './selectors';
import * as commonSelectors from '../common/selectors';
import * as modalActions from '../modals/actions';
import messages from '../../configs/messages';
import configs from '../../configs/variables';
import * as logger from '../../utils/logger';
import coursesClient from '../../clients/coursesClient';
import exercisesClient from '../../clients/exercisesClient';

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
    courseId
  };
}

export function updateCourse({ courseId, updatedValues }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const currentCourse = selectors.getCourseDetail(state, courseId);
    dispatch(updateCourseSuccess({ course: { ...currentCourse, ...updatedValues } }));

    await coursesClient.updateCourse({ context, courseId, ...updatedValues });
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
  course, password, userId, role
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    try {
      await coursesClient.addUserToCourse({
        context, courseId: course.courseId, password, userId, role
      });
      await exercisesClient.addUserToCourse({
        context, courseId: course.courseId, userId
      });

      dispatch(joinCourseSuccess({ course }));
      dispatch(modalActions.hideModal());

      await dispatch(push(configs.pathGenerators.course(course.courseId)));
    } catch (err) {
      if (err.status === 409) {
        dispatch(modalActions.showError(messages.error.wrongPassword));
      }
      if (err.status === 401) {
        throw err;
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
      if (err.status === 401) {
        throw err;
      }
    }
  };
}

export function doubleCourse({ course, sourceCourseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);

    try {
      dispatch(modalActions.showSpinner());

      // adding copy to course and exercises
      const createdCourse = await coursesClient.doubleCourse({ context, course, sourceCourseId });
      await exercisesClient.doubleCourse({ context, course: createdCourse, sourceCourseId });
      // TODO: something to improve it could be do it directly from courses service

      dispatch(getCourseSuccess({ course: createdCourse }));
      dispatch(modalActions.hideModal());

      await dispatch(push(configs.pathGenerators.course(createdCourse.courseId)));
    } catch (err) {
      if (err.status === 409) {
        dispatch(modalActions.showError(messages.error.courseAlreadyExist));
      }
      if (err.status === 401) {
        throw err;
      }
      dispatch(modalActions.hideSpinner());
      dispatch(modalActions.showError(err.message));
    }
  };
}

export function publishCourse({ courseId }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = commonSelectors.context(state);
    const currentCourse = selectors.getCourseDetail(state, courseId);

    const newCourse = {
      ...state.courses.data.detail[courseId],
      courseStatus: 'published'
    };
    dispatch(updateCourseSuccess({ course: newCourse }));

    try {
      await coursesClient.publishCourse({ context, courseId });
    } catch (err) {
      if (err.status === 401) {
        throw err;
      }
      dispatch(updateCourseSuccess({ course: currentCourse }));
      logger.onError('Error while trying to publish the course', err);
    } finally {
      dispatch(modalActions.hideModal());
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

      await coursesClient.deleteCourse({ context, courseId });
    } catch (err) {
      if (err.status === 401) {
        throw err;
      }
      logger.onError('Error while trying to delete the course', err);
    } finally {
      dispatch(modalActions.hideModal());
    }
  };
}
