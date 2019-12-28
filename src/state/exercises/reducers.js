import * as _ from 'lodash';
import * as types from './actionTypes';
import * as idUtils from '../../utils/idUtils';

const initialState = {
  data: {
    list: {},
    detail: {},
    isLoadingExercises: false,
  },
};

function updateExerciseState({
  state, courseId, guideId, exerciseId, exerciseProps
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
    case types.GET_EXERCISES_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          isLoadingExercises: true,
        }
      };
    }

    case types.GET_EXERCISES_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const detail = { ...state.data.detail };
      action.exercises.forEach((exercise) => {
        const courseGuideExerciseId = idUtils.courseGuideExerciseId(
          _.pick(action, 'courseId', 'guideId', 'exerciseId')
        );
        detail[courseGuideExerciseId] = exercise;
      });
      return {
        ...state,
        data: {
          ...state.data,
          list: {
            ...state.data.list,
            [courseGuideId]: action.exercises,
          },
          detail,
          isLoadingExercises: false,
        }
      };
    }

    case types.CREATE_EXERCISE_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const courseGuideExerciseId = idUtils.courseGuideExerciseId(
        _.pick(action, 'courseId', 'guideId', 'exerciseId'),
      );
      const currentExercises = state.data.list[courseGuideId] || [];

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseGuideExerciseId]: action.exercise
          },
          list: {
            ...state.data.list,
            [courseGuideId]: [
              ...currentExercises,
              action.exercise
            ]
          },
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
          currentExpression: '',
          stepList: []
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

      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          stepList: [
            ...state.data.detail[courseGuideId][action.exerciseId].stepList,
            action.currentExpression
          ],
          exerciseStatus: 'resolved',
          currentExpression: ''
        }
      });
    }

    case types.EXERCISE_STEP_IS_VALID: {
      const courseGuideId = courseUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));

      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          stepList: [
            ...state.data.detail[courseGuideId][action.exerciseId].stepList,
            action.currentExpression
          ],
          exerciseStatus: 'editing',
          currentExpression: ''
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

    default:
      return state;
  }
}
