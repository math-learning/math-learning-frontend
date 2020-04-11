import { expect } from 'chai';
import reducer from './reducers';
import * as types from './actionTypes';

describe('exercises reducer', () => {
  let initialState;
  let exercise;
  let finalState;

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
              creatingExerciseError: null,
              isCreatingExercise: false
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
            },
            creatingExerciseError: null,
            isCreatingExercise: false
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
              creatingExerciseError: null,
              isCreatingExercise: false
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
                  currentExpression: ''
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
        currentExpression: '2'
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
                    state: 'resolved',
                    stepList: ['2']
                  },
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression: ''
                }
              }
            },
            list: {
              'c-id/g-id': [{
                ...exercise,
                state: 'resolved',
                stepList: ['2']
              }]
            }
          }
        }
      );
    });
  });

  describe('should handle EXERCISE_STEP_IS_VALID', () => {
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
        type: types.EXERCISE_STEP_IS_VALID,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        currentExpression: '2'
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
                    stepList: ['2']
                  },
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression: ''
                }
              }
            },
            list: {
              'c-id/g-id': [{
                ...exercise,
                stepList: ['2']
              }]
            }
          }
        }
      );
    });
  });

  describe('should handle EXERCISE_STEP_IS_INVALID', () => {
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
        type: types.EXERCISE_STEP_IS_INVALID,
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
                  exerciseStatus: 'invalid',
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
        type: types.EXPRESSION_CHANGE_SUCCESSFULLY,
        courseId: 'c-id',
        guideId: 'g-id',
        exerciseId: 'exercise-id',
        currentExpression: '2'
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
                  currentExpression: '2'
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
      newExercise = { exerciseId: 'exercise-id', stepList: ['2'], status: 'resolved' };
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
                  currentExpression: '2x'
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
                currentExpression: '2x'
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
                    stepList: []
                  },
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression: '2x'
                }
              }
            },
            list: {
              'c-id/g-id': [{
                ...exercise,
                state: 'incompleted',
                stepList: []
              }]
            }
          }
        }
      );
    });
  });
});
