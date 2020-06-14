import { expect } from 'chai';
import reducer from './reducers';
import * as types from './actionTypes';

describe('exercises reducer', () => {
  let initialState;
  let exercise;
  let finalState;

  describe('should handle CREATE_EXERCISE_REQUEST', () => {
    beforeEach(() => {
      initialState = {
        data: {}
      };

      finalState = reducer(initialState, {
        type: types.CREATE_EXERCISE_REQUEST
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            creation: {
              isCreatingExercise: true,
              creatingExerciseError: null
            }
          }
        }
      );
    });
  });

  describe('should handle CREATE_EXERCISE_FAIL', () => {
    let error;

    beforeEach(() => {
      error = 'err';
      initialState = {
        data: {}
      };

      finalState = reducer(initialState, {
        type: types.CREATE_EXERCISE_FAIL,
        error
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            creation: {
              isCreatingExercise: false,
              creatingExerciseError: error
            }
          }
        }
      );
    });
  });

  describe('should handle EVALUATE_EXERCISE_SUCCESS', () => {
    let solvedExercise;

    beforeEach(() => {
      solvedExercise = {};
      initialState = {
        data: {}
      };

      finalState = reducer(initialState, {
        type: types.EVALUATE_EXERCISE_SUCCESS,
        solvedExercise
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            creation: {
              solvedCreatingExercise: solvedExercise,
              isEvaluatingExercise: false,
              creatingExerciseError: null
            }
          }
        }
      );
    });
  });

  describe('should handle EVALUATE_EXERCISE_REQUEST', () => {
    beforeEach(() => {
      initialState = {
        data: {}
      };

      finalState = reducer(initialState, {
        type: types.EVALUATE_EXERCISE_REQUEST
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            creation: {
              solvedCreatingExercise: null,
              isEvaluatingExercise: true,
              creatingExerciseError: null
            }
          }
        }
      );
    });
  });

  describe('should handle EVALUATE_EXERCISE_FAIL', () => {
    let error;

    beforeEach(() => {
      error = 'error';
      initialState = {
        data: {}
      };

      finalState = reducer(initialState, {
        type: types.EVALUATE_EXERCISE_FAIL,
        error
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            creation: {
              solvedCreatingExercise: null,
              isEvaluatingExercise: false,
              creatingExerciseError: error
            }
          }
        }
      );
    });
  });

  describe('should handle RESET_EXERCISE_ERROR', () => {
    beforeEach(() => {
      initialState = {
        data: {}
      };

      finalState = reducer(initialState, {
        type: types.RESET_EXERCISE_ERROR
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            creation: {
              creatingExerciseError: null
            }
          }
        }
      );
    });
  });

  describe('should handle RESET_SOLVED_EXERCISE', () => {
    beforeEach(() => {
      initialState = {
        data: {}
      };

      finalState = reducer(initialState, {
        type: types.RESET_SOLVED_EXERCISE
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            creation: {
              solvedCreatingExercise: null
            }
          }
        }
      );
    });
  });

  describe('should handle CREATE_EXERCISE_SUCCESS', () => {
    describe('when there was nothing in the state', () => {
      beforeEach(() => {
        exercise = { exerciseId: 'exercise' };
        initialState = { data: { list: {}, detail: {} } };

        finalState = reducer(initialState, {
          type: types.CREATE_EXERCISE_SUCCESS,
          courseId: 'c-id',
          guideId: 'g-id',
          exerciseId: 'exercise-id',
          exercise: { exerciseId: 'exercise' }
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              list: {
                'c-id/g-id': [exercise]
              },
              detail: {
                'c-id/g-id': { exercise: { exercise } },
              },
              creation: {
                creatingExerciseError: null,
                isCreatingExercise: false
              }
            },
          }
        );
      });
    });

    describe('when there was another exercises in the state', () => {
      let previousExercise;

      beforeEach(() => {
        exercise = { exerciseId: 'exercise' };
        previousExercise = { exerciseId: 'exercise-2' };
        initialState = {
          data: {
            list: {
              'c-id/g-id': [previousExercise]
            },
            detail: {
              'c-id/g-id': {
                [previousExercise.exerciseId]: { exercise: { ...previousExercise } },
              },
            }
          }
        };

        finalState = reducer(initialState, {
          type: types.CREATE_EXERCISE_SUCCESS,
          courseId: 'c-id',
          guideId: 'g-id',
          exerciseId: 'exercise',
          exercise: { exerciseId: 'exercise' }
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              list: {
                'c-id/g-id': [
                  previousExercise,
                  exercise
                ]
              },
              detail: {
                'c-id/g-id': {
                  [previousExercise.exerciseId]: { exercise: { ...previousExercise } },
                  [exercise.exerciseId]: { exercise: { ...exercise } },
                }
              },
              creation: {
                creatingExerciseError: null,
                isCreatingExercise: false
              }
            },
          }
        );
      });
    });
  });

  describe('should handle GET_EXERCISE_SUCCESS', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id', stepList: [] };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': []
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.GET_EXERCISE_SUCCESS,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        exercise
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {
                [exercise.exerciseId]: {
                  exercise,
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression: { expression: '', variables: [] }
                }
              }
            }
          }
        }
      );
    });
  });

  describe('should handle GET_USER_EXERCISE_SUCCESS', () => {
    let userId;

    beforeEach(() => {
      userId = 'user';
      exercise = { exerciseId: 'exercise-id', stepList: [] };
      initialState = {
        data: {
          students: {
            list: {},
            detail: {}
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.GET_USER_EXERCISE_SUCCESS,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        exercise,
        userId
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            students: {
              list: {},
              detail: {
                'c-id/g-id': {
                  [userId]: {
                    [exercise.exerciseId]: {
                      exercise,
                      isLoading: false
                    }
                  }
                }
              }
            }
          }
        }
      );
    });
  });

  describe('should handle GET_EXERCISES_SUCCESS', () => {
    let exercises;

    beforeEach(() => {
      exercises = [{ exerciseId: 'exercise-id', stepList: [] }];
      initialState = {
        data: {
          list: {}
        }
      };

      finalState = reducer(initialState, {
        type: types.GET_EXERCISES_SUCCESS,
        courseId: 'c-id',
        guideId: 'g-id',
        exercises
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            list: {
              'c-id/g-id': exercises
            }
          }
        }
      );
    });
  });

  describe('should handle GET_USER_EXERCISES_SUCCESS', () => {
    let userId;
    let exercises;

    beforeEach(() => {
      userId = 'user';
      exercises = [{ exerciseId: 'exercise-id', stepList: [] }];
      initialState = {
        data: {
          students: {
            list: {},
            detail: {}
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.GET_USER_EXERCISES_SUCCESS,
        courseId: 'c-id',
        guideId: 'g-id',
        exercises,
        userId
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            students: {
              detail: {},
              list: {
                'c-id/g-id': {
                  [userId]: exercises
                }
              }
            }
          }
        }
      );
    });
  });

  describe('should handle DELETE_EXERCISE_REQUEST', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id', stepList: [] };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              'exercise-id': exercise
            }
          },
          list: {
            'c-id/g-id': [exercise]
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.DELETE_EXERCISE_REQUEST,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id'
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {}
            },
            list: {
              'c-id/g-id': []
            }
          }
        }
      );
    });
  });

  describe('should handle REMOVE_EXERCISE_DETAIL', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id', stepList: [] };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              'exercise-id': exercise
            }
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.REMOVE_EXERCISE_DETAIL,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id'
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {}
            }
          }
        }
      );
    });
  });

  describe('should handle RESOLVE_EXERCISE_REQUEST', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id', stepList: [] };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: ''
              }
            }
          },
          list: {
            'c-id/g-id': [
              { ...exercise }
            ]
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.RESOLVE_EXERCISE_REQUEST,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id'
      });
    });
    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {
                [exercise.exerciseId]: {
                  exercise,
                  isLoading: false,
                  exerciseStatus: 'processing',
                  currentExpression: ''
                }
              }
            },
            list: {
              'c-id/g-id': [
                { ...exercise }
              ]
            }
          }
        }
      );
    });
  });

  describe('should handle EXERCISE_RESOLVED', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id', stepList: [] };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: '2x'
              }
            }
          },
          list: {
            'c-id/g-id': [
              { ...exercise }
            ]
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.EXERCISE_RESOLVED,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        currentExpression: { expression: '2' }
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {
                [exercise.exerciseId]: {
                  exercise: {
                    ...exercise,
                    hints: [],
                    state: 'resolved',
                    stepList: [{ expression: '2' }]
                  },
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression: { expression: '', variables: [] }
                }
              }
            },
            list: {
              'c-id/g-id': [{
                ...exercise,
                hints: [],
                state: 'resolved',
                stepList: [{ expression: '2' }]
              }]
            }
          }
        }
      );
    });
  });

  describe('should handle EXERCISE_STEP_IS_VALID', () => {
    let currentExpression;

    beforeEach(() => {
      currentExpression = { expression: '2' };
      exercise = { exerciseId: 'exercise-id', stepList: [] };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression
              }
            }
          },
          list: {
            'c-id/g-id': [
              exercise
            ]
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.EXERCISE_STEP_IS_VALID,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        currentExpression
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {
                [exercise.exerciseId]: {
                  exercise: {
                    ...exercise,
                    hints: [],
                    stepList: [currentExpression]
                  },
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression
                }
              }
            },
            list: {
              'c-id/g-id': [{
                ...exercise,
                hints: [],
                stepList: [{ expression: '2' }]
              }]
            }
          }
        }
      );
    });
  });

  describe('should handle EXERCISE_STEP_IS_INVALID', () => {
    let hints;

    beforeEach(() => {
      hints = [{ title: 'title' }];
      exercise = { exerciseId: 'exercise-id', stepList: [] };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: { expression: '2x' }
              }
            }
          },
          list: {
            'c-id/g-id': [exercise]
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.EXERCISE_STEP_IS_INVALID,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        result: { hints }
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {
                [exercise.exerciseId]: {
                  exercise: { ...exercise, hints },
                  isLoading: false,
                  exerciseStatus: 'invalid',
                  currentExpression: { expression: '2x' }
                }
              }
            },
            list: {
              'c-id/g-id': [
                { ...exercise, hints }
              ]
            }
          }
        }
      );
    });
  });

  describe('should handle EXPRESSION_CHANGE_SUCCESSFULLY', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id', stepList: [] };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: { expression: '2x' }
              }
            }
          },
          list: {
            'c-id/g-id': [
              { ...exercise }
            ]
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.EXPRESSION_CHANGE_SUCCESSFULLY,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        currentExpression: { expression: '2' }
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {
                [exercise.exerciseId]: {
                  exercise,
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression: { expression: '2' }
                }
              }
            },
            list: {
              'c-id/g-id': [
                { ...exercise }
              ]
            }
          }
        }
      );
    });
  });

  describe('should handle UPDATE_EXERCISE', () => {
    let newExercise;

    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id', stepList: [] };
      newExercise = { exerciseId: 'exercise-id', stepList: [{ expression: '2' }], status: 'resolved' };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: { expression: '2x' }
              }
            }
          },
          list: {
            'c-id/g-id': [exercise]
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.UPDATE_EXERCISE,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        exercise: newExercise
      });
    });
    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {
                [exercise.exerciseId]: {
                  exercise: newExercise,
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression: { expression: '2x' }
                }
              }
            },
            list: {
              'c-id/g-id': [newExercise]
            }
          }
        }
      );
    });
  });

  describe('should handle UPDATE_PIPELINE_STATUS', () => {
    let newExercise;

    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id', pipelineStatus: 'waiting', difficulty: 'hard' };
      newExercise = { ...exercise, pipelineStatus: 'generated' };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {}
          },
          list: {
            'c-id/g-id': [exercise]
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.UPDATE_PIPELINE_STATUS,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        pipelineStatus: 'generated'
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {}
            },
            list: {
              'c-id/g-id': [newExercise]
            }
          }
        }
      );
    });
  });

  describe('should handle GET_ALL_RESOLUTIONS_SUCCESS', () => {
    let resolutions;

    beforeEach(() => {
      resolutions = [{ stepList: ['2'] }];
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              'exercise-id': {
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: { expression: '2x' }
              }
            }
          },
          list: {
            'c-id/g-id': []
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.GET_ALL_RESOLUTIONS_SUCCESS,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        resolutions
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {
                'exercise-id': {
                  resolutions,
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression: { expression: '2x' }
                }
              }
            },
            list: {
              'c-id/g-id': []
            }
          }
        }
      );
    });
  });

  describe('should handle REMOVE_EXERCISE_STEP', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id', stepList: ['2'], state: 'incompleted' };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: { expression: '2x' }
              }
            }
          },
          list: {
            'c-id/g-id': [exercise]
          }
        }
      };

      finalState = reducer(initialState, {
        type: types.REMOVE_EXERCISE_STEP,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id'
      });
    });

    it('should make the expected state', () => {
      expect(finalState).deep.equal(
        {
          data: {
            detail: {
              'c-id/g-id': {
                [exercise.exerciseId]: {
                  exercise: {
                    ...exercise,
                    state: 'incompleted',
                    stepList: [],
                    hints: [],
                  },
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression: { expression: '2x' }
                }
              }
            },
            list: {
              'c-id/g-id': [{
                ...exercise,
                state: 'incompleted',
                stepList: [],
                hints: [],
              }]
            }
          }
        }
      );
    });
  });
});
