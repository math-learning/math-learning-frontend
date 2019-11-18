import * as types from './actionTypes';

const initialState = {
  data: {
    ownCourses: [],
    isLoadingCourses: true
  },
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.GET_COURSES_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          ownCourses: action.courses,
          isLoadingCourses: false
        }
      };
    }

    case types.CREATE_COURSE_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          ownCourses: [
            action.course,
            ...state.data.ownCourses
          ]
        }
      };
    }

    default:
      return state;
  }
}
