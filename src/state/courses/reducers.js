import * as types from './actionTypes';
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
      return {
        ...state,
        data: {
          ...state.data,
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

    case types.UPDATE_COURSE_SUCCESS: {
      const detail = { ...state.data.detail };
      detail[action.course.courseId] = {
        ...detail[action.course.courseId],
        ...action.course,
      };
      return {
        ...state,
        data: {
          ...state.data,
          detail,
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
      const detail = { ...state.data.detail };
      let ownCourses = [...state.data.own.courses];
      let listCourses = [...state.data.list.courses];
      ownCourses = ownCourses.filter((course) => course.courseId !== action.courseId);
      listCourses = listCourses.filter((course) => course.courseId !== action.courseId);
      delete detail[action.courseId];

      return {
        ...state,
        data: {
          ...state.data,
          detail,
          own: {
            ...state.data.own,
            courses: ownCourses,
          },
          list: {
            ...state.data.list,
            courses: listCourses,
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
