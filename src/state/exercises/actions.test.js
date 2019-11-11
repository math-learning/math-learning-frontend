import { expect } from 'chai';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as types from './actionTypes';
import * as actions from './actions';
import * as modalTypes from '../modals/actionTypes';
import exercisesClient from '../../clients/exercisesClient';

const mockStore = configureMockStore([thunk]);

describe('exercises actions', () => {
  let store;
  let courseId;
  let guideId;
  let expectedActions;

  beforeEach(() => {
    courseId = 'course';
    guideId = 'guide';
    store = mockStore({
      common: {
        data: {}
      }
    });
  });

  describe('createExercise() function', () => {
    let exercise;
    let createdExercise;

    describe('when the exercise is created successfully', () => {
      beforeEach(() => {
        exercise = {
          name: 'ex name',
          type: 'derivative',
          exercise: 'xdx',
          difficulty: 'easy',
          description: 'descripcion'
        };
        createdExercise = {
          ...exercise,
          courseId,
          guideId
        };
        expectedActions = [
          {
            type: types.CREATE_EXERCISE_SUCCESS,
            guideId,
            courseId,
            exercise: createdExercise
          },
          { type: modalTypes.HIDE_MODAL }
        ];
        sandbox
          .stub(exercisesClient, 'createExercise')
          .callsFake(() => createdExercise);

        return store.dispatch(actions.createExercise({ guideId, courseId, exercise }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });
});
