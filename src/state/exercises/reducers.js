import _ from 'lodash';
import * as types from './actionTypes';
import * as commonTypes from '../common/actionTypes';
import * as idUtils from '../../utils/idUtils';

const initialState = {
  data: {
    list: {},
    detail: {},
    students: {
      list: {},
      detail: {}
    },
    isEvaluatingExercise: false,
    isCreatingExercise: false, // TODO: nodo creating
    solvedCreatingExercise: null,
    creatingExerciseError: null
  },
};

function updateExerciseState({
  state: currentState, courseId, guideId, exerciseId, exerciseProps = {}
}) {
  const courseGuideId = idUtils.courseGuideId({ courseId, guideId });
  const exercises = currentState.data.detail[courseGuideId] || {};
  const newExercisesState = {
    ...exercises,
    [exerciseId]: {
      ...exercises[exerciseId],
      ...exerciseProps
    }
  };
  const courseGuideList = currentState.data.list[courseGuideId] || [];
  if (exerciseProps.exercise) {
    let indexOfExercise;
    courseGuideList.forEach((value, index) => { if (value.exerciseId === exerciseId) indexOfExercise = index; });

    const {
      name,
      type,
      state,
      problemInput,
      difficulty,
      description
    } = exerciseProps.exercise;

    courseGuideList[indexOfExercise] = {
      ...courseGuideList[indexOfExercise],
      name,
      type,
      state,
      difficulty,
      problemInput,
      description
    };

    courseGuideList[indexOfExercise] = _.pickBy(courseGuideList[indexOfExercise]);
  }

  return {
    ...currentState,
    data: {
      ...currentState.data,
      detail: {
        ...currentState.data.detail,
        [courseGuideId]: newExercisesState
      },
      list: {
        ...currentState.data.list,
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
          isLoadingExercises: true
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
            [courseGuideId]: action.exercises
          }
        }
      };
    }

    case types.GET_USER_EXERCISES_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));

      return {
        ...state,
        data: {
          ...state.data,
          students: {
            ...state.data.students,
            list: {
              ...state.data.students.list,
              [courseGuideId]: {
                ...state.data.students.list[courseGuideId],
                [action.userId]: action.exercises
              }
            }
          }
        }
      };
    }

    case types.CREATE_EXERCISE_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          isCreatingExercise: true,
          creatingExerciseError: null
        }
      };
    }

    case types.CREATE_EXERCISE_FAIL: {
      return {
        ...state,
        data: {
          ...state.data,
          isCreatingExercise: false,
          creatingExerciseError: action.error
        }
      };
    }

    case types.EVALUATE_EXERCISE_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          solvedCreatingExercise: action.solvedExercise,
          isEvaluatingExercise: false,
          creatingExerciseError: null
        }
      };
    }

    case types.EVALUATE_EXERCISE_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          solvedCreatingExercise: null,
          isEvaluatingExercise: true,
          creatingExerciseError: null
        }
      };
    }

    case types.EVALUATE_EXERCISE_FAIL: {
      return {
        ...state,
        data: {
          ...state.data,
          solvedCreatingExercise: null,
          isEvaluatingExercise: false,
          creatingExerciseError: action.error
        }
      };
    }

    case types.RESET_EXERCISE_ERROR: {
      return {
        ...state,
        data: {
          ...state.data,
          creatingExerciseError: null
        }
      };
    }

    case types.RESET_SOLVED_EXERCISE: {
      return {
        ...state,
        data: {
          ...state.data,
          solvedCreatingExercise: null
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
          isCreatingExercise: false,
          creatingExerciseError: null,
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

    case types.GET_USER_EXERCISE_SUCCESS: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));

      const detailObj = state.data.students.detail[courseGuideId] || {};
      const userExercises = detailObj[action.userId];
      const userDetailObj = {
        ...detailObj,
        [action.userId]: {
          ...userExercises,
          [action.exerciseId]: {
            exercise: action.exercise,
            isLoading: false
          }
        }
      };

      return {
        ...state,
        data: {
          ...state.data,
          students: {
            ...state.data.students,
            detail: {
              ...state.data.students.detail,
              [courseGuideId]: {
                ...state.data.students.detail[courseGuideId],
                ...userDetailObj
              }
            }
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
      const newDetail = _.omit(state.data.detail[courseGuideId], action.exerciseId);
      const newList = state.data.list[courseGuideId].filter((exercise) => exercise.exerciseId !== action.exerciseId);

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseGuideId]: newDetail
          },
          list: {
            ...state.data.list,
            [courseGuideId]: newList
          }
        }
      };
    }

    case types.REMOVE_EXERCISE_DETAIL: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const newDetail = _.omit(state.data.detail[courseGuideId], action.exerciseId);

      return {
        ...state,
        data: {
          ...state.data,
          detail: {
            ...state.data.detail,
            [courseGuideId]: newDetail
          }
        }
      };
    }

    case types.DELIVER_EXERCISE_REQUEST: {
      const courseGuideId = idUtils.courseGuideId(_.pick(action, 'courseId', 'guideId'));
      const currentExercise = state.data.detail[courseGuideId][action.exerciseId].exercise;

      return updateExerciseState({
        state,
        courseId: action.courseId,
        guideId: action.guideId,
        exerciseId: action.exerciseId,
        exerciseProps: {
          exercise: {
            ...currentExercise,
            state: 'delivered'
          },
        }
      });
    }

    case commonTypes.LOGOUT_SUCCESS: {
      // cleaning the state
      return initialState;
    }

    default:
      return state;
  }
}
