import * as _ from 'lodash';
import * as types from './actionTypes';
import * as courseUtils from '../../utils/courseUtils';

const initialState = {
  data: {
    exercises: {}
  },
};

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_EXERCISE_SUCCESS: {
      const courseGuideId = courseUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const currentExercises = state.data.exercises[courseGuideId] || [];

      return {
        ...state,
        data: {
          ...state.data,
          exercises: {
            ...state.data.exercises,
            [courseGuideId]: [
              ...currentExercises,
              action.exercise
            ]
          }
        }
      };
    }

    default:
      return state;
  }
}
