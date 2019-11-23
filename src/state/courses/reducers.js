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
    }
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
