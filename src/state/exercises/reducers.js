import * as _ from 'lodash';
import * as types from './actionTypes';
import * as courseUtils from '../../utils/courseUtils';

const initialState = {
  data: {
    list: {},
    detail: {}
  },
};

function updateExerciseState({
  state, courseId, guideId, exerciseId, exerciseProps = {}
}) {
  const courseGuideId = courseUtils.courseGuideId({ courseId, guideId });
  const exercises = state.data.detail[courseGuideId] || {};

  const newExercisesState = {
    ...exercises,
    [exerciseId]: {
      ...exercises[exerciseId],
      ...exerciseProps
    }
  };

  return {
    ...state,
    data: {
      ...state.data,
      detail: {
        ...state.data.detail,
        [courseGuideId]: newExercisesState
      }
    }
  };
}

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_EXERCISE_SUCCESS: {
      const courseGuideId = courseUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const listExercises = state.data.list[courseGuideId] || [];

      return {
        ...state,
        data: {
          ...state.data,
          list: {
            ...state.data.list,
            [courseGuideId]: [
              ...listExercises,
              { ...action.exercise, stepList: [] }
            ]
          }
        }
      };
    }

    case types.GET_EXERCISE_SUCCESS: {
      const courseGuideId = courseUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const exercises = state.data.detail[courseGuideId] || {};
      const newExercisesState = {
        ...exercises,
        [action.exerciseId]: {
          exercise: action.exercise,
          isLoading: false,
          exerciseStatus: 'editing',
          currentExpression: ''
        }
      };

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseGuideId]: newExercisesState
          }
        }
      };
    }

    case types.RESOLVE_EXERCISE_REQUEST: {
      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: { exerciseStatus: 'processing' }
      });
    }

    case types.EXERCISE_RESOLVED: {
      const courseGuideId = courseUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const currentExercise = state.data.detail[courseGuideId][action.exerciseId].exercise;

      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exerciseStatus: 'editing',
          currentExpression: '',
          exercise: {
            ...currentExercise,
            stepList: [
              ...currentExercise.stepList,
              action.currentExpression
            ],
            state: 'resolved'
          },
        }
      });
    }

    case types.EXERCISE_STEP_IS_VALID: {
      const courseGuideId = courseUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const currentExercise = state.data.detail[courseGuideId][action.exerciseId].exercise;

      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exerciseStatus: 'editing',
          currentExpression: '',
          exercise: {
            ...currentExercise,
            stepList: [
              ...currentExercise.stepList,
              action.currentExpression
            ]
          },
        }
      });
    }

    case types.EXERCISE_STEP_IS_INVALID: {
      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: { exerciseStatus: 'invalid' }
      });
    }

    case types.EXPRESSION_CHANGE_SUCCESSFULLY: {
      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exerciseStatus: 'editing',
          currentExpression: action.currentExpression
        }
      });
    }

    case types.UPDATE_EXERCISE: {
      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exercise: action.exercise,
        }
      });
    }

    case types.REMOVE_EXERCISE_STEP: {
      const courseGuideId = courseUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const currentExercise = state.data.detail[courseGuideId][action.exerciseId].exercise;

      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exerciseStatus: 'editing',
          exercise: {
            ...currentExercise,
            state: 'incompleted',
            stepList: currentExercise.stepList.slice(0, -1)
          }
        }
      });
    }

    default:
      return state;
  }
}
