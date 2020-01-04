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
                  currentExpression: ''
                }
              }
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
              'c-id/g-id': [
                { ...exercise }
              ]
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
              'c-id/g-id': [
                { ...exercise }
              ]
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
            'c-id/g-id': [
              { ...exercise }
            ]
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
              'c-id/g-id': [
                { ...exercise }
              ]
            }
          }
        }
      );
    });
  });

  describe('should handle REMOVE_EXERCISE_STEP', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id', stepList: ['2'] };
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
              'c-id/g-id': [
                { ...exercise }
              ]
            }
          }
        }
      );
    });
  });
});
