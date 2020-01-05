import _ from 'lodash';
import * as types from './actionTypes';
import * as commonTypes from '../common/actionTypes';
import * as idUtils from '../../utils/idUtils';

const initialState = {
  data: {
    list: {},
    detail: {},
    isLoadingExercises: false,
  },
};

function updateExerciseState({
  state, courseId, guideId, exerciseId, exerciseProps = {}
}) {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });
  const exercises = state.data.detail[courseGuideId] || {};
  const newExercisesState = {
    ...exercises,
    [exerciseId]: {
      ...exercises[exerciseId],
      ...exerciseProps
    }
  };
  const courseGuideList = state.data.list[courseGuideId];
  if (exerciseProps.exercise) {
    let indexOfExercise;
    courseGuideList.forEach((value, index) => { if (value.exerciseId === exerciseId) indexOfExercise = index; });

    const {
      name,
      type,
      problemInput,
      difficulty,
      description
    } = exerciseProps.exercise;

    courseGuideList[indexOfExercise] = {
      ...courseGuideList[indexOfExercise],
      name,
      type,
      difficulty,
      problemInput,
      description
    };

    courseGuideList[indexOfExercise] = _.pickBy(courseGuideList[indexOfExercise]);
  }

  return {
    ...state,
    data: {
      ...state.data,
      detail: {
        ...state.data.detail,
        [courseGuideId]: newExercisesState
      },
      list: {
        ...state.data.list,
        [courseGuideId]: [...courseGuideList],
      },
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

      return {
        ...state,
        data: {
          ...state.data,
          list: {
            ...state.data.list,
            [courseGuideId]: action.exercises,
          },
          isLoadingExercises: false,
        }
      };
    }

    case types.CREATE_EXERCISE_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const { exerciseId } = action.exercise;
      const currentListExercises = state.data.list[courseGuideId] || [];
      const currentDetailExercises = state.data.detail[courseGuideId] || {};

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseGuideId]: {
              ...currentDetailExercises,
              [exerciseId]: {
                exercise: action.exercise,
              }
            }
          },
          list: {
            ...state.data.list,
            [courseGuideId]: [
              ...currentListExercises,
              action.exercise
            ]
          },
        }
      };
    }

    case types.GET_EXERCISE_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
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
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
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
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
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
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
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

    case types.DELETE_EXERCISE_REQUEST: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const detail = { ...state.data.detail[courseGuideId] };
      delete detail[action.exerciseId];

      const list = state.data.list[courseGuideId].filter((exercise) => exercise.exerciseId !== action.exerciseId);

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseGuideId]: detail
          },
          list: {
            ...state.data.list,
            [courseGuideId]: list
          }
        }
      };
    }

    case types.REMOVE_EXERCISE_DETAIL: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const detail = { ...state.data.detail[courseGuideId] };
      delete detail[action.exerciseId];

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseGuideId]: detail
          }
        }
      };
    }

    case commonTypes.LOGOUT_SUCCESS: {
      // cleaning the state
      return initialState;
    }

    case types.DELETE_EXERCISE_SUCCESS:
    default:
      return state;
  }
}
