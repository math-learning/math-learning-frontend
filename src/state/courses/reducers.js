import _ from 'lodash';
import * as types from './actionTypes';
import * as userUtils from '../../utils/userUtils';
import * as commonTypes from '../common/actionTypes';

const initialState = {
  data: {
    own: {
      courses: [],
      isLoadingCourses: true
    },
    list: {
      courses: [],
      isLoadingCourses: true
    },
    detail: {}
  },
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.GET_COURSES_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          own: {
            courses: action.courses,
            isLoadingCourses: false
          }
        }
      };
    }

    case types.GET_COURSE_DETAIL_SUCCESS: {
      const sortedUsers = userUtils.sortUsersArray(action.course.users);

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [action.course.courseId]: {
              ...action.course,
              users: sortedUsers,
              isLoading: false
            }
          }
        }
      };
    }

    case types.UPDATE_COURSE_SUCCESS: {
      const newCourse = {
        ...state.data.detail[action.course.courseId],
        ...action.course
      };

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [action.course.courseId]: {
              ...newCourse,
              isLoading: false
            }
          }
        }
      };
    }

    case types.LIST_COURSES_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          list: {
            ...state.data.list,
            courses: action.courses,
            isLoadingCourses: false
          }
        }
      };
    }

    case types.LIST_COURSES_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          list: {
            ...state.data.list,
            isLoadingCourses: true
          }
        }
      };
    }

    case types.JOIN_COURSE_SUCCESS: {
      const newListCourses = state.data.list.courses.filter(
        (course) => course.courseId !== action.course.courseId
      );
      const newOwnCourses = [
        action.course,
        ...state.data.own.courses
      ];

      return {
        ...state,
        data: {
          ...state.data,
          list: {
            ...state.data.list,
            courses: newListCourses
          },
          own: {
            ...state.data.own,
            courses: newOwnCourses
          }
        }
      };
    }

    case types.CREATE_COURSE_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          own: {
            ...state.data.own,
            courses: [
              action.course,
              ...state.data.own.courses
            ]
          },
          detail: {
            ...state.data.detail,
            [action.course.courseId]: {
              ...action.course,
              isLoading: false
            }
          }
        }
      };
    }

    case types.DELETE_COURSE_REQUEST: {
      const newDetail = _.omit(state.data.detail, action.courseId)
      const ownCourses = state.data.own.courses
        .filter((course) => course.courseId !== action.courseId);

      return {
        ...state,
        data: {
          ...state.data,
          detail: newDetail,
          own: {
            ...state.data.own,
            courses: ownCourses,
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
