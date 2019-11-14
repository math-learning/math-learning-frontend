import * as _ from 'lodash';
import * as types from './actionTypes';
// import * as courseUtils from '../../utils/courseUtils';

const initialState = {
  data: {
    ownCourses: {},
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
          ownCourses: {
            pepe: action.courses
          },
          isLoadingCourses: false
        }
      };
    }

    default:
      return state;
  }
}
