import { expect } from 'chai';
import reducer from './reducers';
import * as types from './actionTypes';

describe('exercises reducer', () => {
  let initialState;

  describe('should handle CREATE_EXERCISE_SUCCESS', () => {
    let exercise;
    let finalState;

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
});
