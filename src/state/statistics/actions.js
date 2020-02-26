import * as types from './actionTypes';
import * as commonSelectors from '../common/selectors';
import coursesClient from '../../clients/coursesClient';

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
