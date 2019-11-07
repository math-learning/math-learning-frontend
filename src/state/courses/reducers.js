import * as types from './actionTypes';

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
    // TODO: ver como hacer que no ocupe mucho espacio
    detail: {},
    isLoadingCourseDetail: true,
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
      const detail = { ...state.data.detail };
      console.log(action);
      detail[action.course.courseId] = action.course;
      return {
        ...state,
        data: {
          ...state.data,
          detail,
          isLoadingCourseDetail: false,
        }
      }
    }

    case types.UPDATE_COURSE_SUCCESS: {
      let detail = { ...state.data.detail };
      detail[action.course.courseId] = {
        ...detail[action.course.courseId],
        ...action.course,
      };
      console.log(action);
      return {
        ...state,
        data: {
          ...state.data,
          detail,
        }
      }
    }

    case types.COURSE_DETAIL_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          isLoadingCourseDetail: true,
        }
      }
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
          }
        }
      };
    }

    default:
      return state;
  }
}
