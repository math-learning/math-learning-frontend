import * as types from './actionTypes';
import * as commonTypes from '../common/actionTypes';

const initialState = {
  data: {
    courses: {}
  },
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.GET_COURSE_USERS_ACTIVITY_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          courses: {
            ...state.data.courses,
            [action.courseId]: {
              ...state.data.courses[action.courseId],
              usersActivity: action.statistics
            }
          }
        }
      };
    }

    case commonTypes.LOGOUT_SUCCESS: {
      // cleaning the state
      return initialState;
    }

    default:
      return state;
  }
}
