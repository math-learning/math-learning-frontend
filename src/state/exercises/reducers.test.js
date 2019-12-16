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
        exercise = { id: 'exercise' };
        initialState = { data: { exercises: {} } };

        finalState = reducer(initialState, {
          type: types.CREATE_EXERCISE_SUCCESS,
          courseId: 'c-id',
          guideId: 'g-id',
          exercise: { id: 'exercise' }
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              exercises: {
                'c-id/g-id': [exercise]
              }
            }
          }
        );
      });
    });

    describe('when there was another exercises in the state', () => {
      let previousExercise;

      beforeEach(() => {
        exercise = { id: 'exercise' };
        previousExercise = { id: 'exercise-2' };
        initialState = {
          data: {
            exercises: {
              'c-id/g-id': [previousExercise]
            }
          }
        };

        finalState = reducer(initialState, {
          type: types.CREATE_EXERCISE_SUCCESS,
          courseId: 'c-id',
          guideId: 'g-id',
          exercise: { id: 'exercise' }
        });
      });

      it('should make the expected state', () => {
        expect(finalState).deep.equal(
          {
            data: {
              exercises: {
                'c-id/g-id': [
                  previousExercise,
                  exercise
                ]
              }
            }
          }
        );
      });
    });
  });

  describe('should handle GET_EXERCISE_SUCCESS', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id' };
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
                  currentExpression: '',
                  stepList: []
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
      exercise = { exerciseId: 'exercise-id' };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: '',
                stepList: []
              }
            }
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
                  currentExpression: '',
                  stepList: []
                }
              }
            }
          }
        }
      );
    });
  });

  describe('should handle EXERCISE_RESOLVED', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id' };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: '2x',
                stepList: []
              }
            }
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
                  exercise,
                  isLoading: false,
                  exerciseStatus: 'resolved',
                  currentExpression: '',
                  stepList: ['2']
                }
              }
            }
          }
        }
      );
    });
  });

  describe('should handle EXERCISE_STEP_IS_VALID', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id' };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: '',
                stepList: []
              }
            }
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
                  exercise,
                  isLoading: false,
                  exerciseStatus: 'editing',
                  currentExpression: '',
                  stepList: ['2']
                }
              }
            }
          }
        }
      );
    });
  });

  describe('should handle EXERCISE_STEP_IS_INVALID', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id' };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: '2x',
                stepList: []
              }
            }
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
                  currentExpression: '2x',
                  stepList: []
                }
              }
            }
          }
        }
      );
    });
  });

  describe('should handle EXPRESSION_CHANGE_SUCCESSFULLY', () => {
    beforeEach(() => {
      exercise = { exerciseId: 'exercise-id' };
      initialState = {
        data: {
          detail: {
            'c-id/g-id': {
              [exercise.exerciseId]: {
                exercise,
                isLoading: false,
                exerciseStatus: 'editing',
                currentExpression: '2x',
                stepList: []
              }
            }
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
                  currentExpression: '2',
                  stepList: []
                }
              }
            }
          }
        }
      );
    });
  });
});
