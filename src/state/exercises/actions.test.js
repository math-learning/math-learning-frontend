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
  let exercise;
  let exerciseId;
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

  describe('getExercise() function', () => {
    describe('when the exercise is getted successfully', () => {
      beforeEach(() => {
        exerciseId = 'exercise-id';
        exercise = { name: 'ex name' };
        expectedActions = [
          {
            type: types.GET_EXERCISE_SUCCESS,
            guideId,
            courseId,
            exerciseId,
            exercise
          },
          { type: modalTypes.HIDE_MODAL }
        ];
        sandbox
          .stub(exercisesClient, 'getExercise')
          .callsFake(() => exercise);

        return store.dispatch(actions.getExercise({ guideId, courseId, exerciseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('resolveExercise() function', () => {
    let stepList;
    let exerciseStatus;
    let problemInput;
    let currentExpression;

    beforeEach(() => {
      stepList = [];
      problemInput = '2x';
      currentExpression = '2';
      exerciseId = 'exercise-id';
      exercise = { name: 'ex name' };
    });

    describe('when exercise is valid', () => {
      beforeEach(() => {
        exerciseStatus = { status: 'valid' };
        expectedActions = [
          {
            type: types.RESOLVE_EXERCISE_REQUEST,
            guideId,
            courseId,
            exerciseId,
          },
          {
            type: types.EXERCISE_STEP_IS_VALID,
            guideId,
            courseId,
            exerciseId,
            currentExpression
          }
        ];
        sandbox
          .stub(exercisesClient, 'resolveExercise')
          .callsFake(() => exerciseStatus);

        return store.dispatch(actions.resolveExercise({
          guideId,
          courseId,
          exerciseId,
          stepList,
          problemInput,
          currentExpression
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when exercise is invalid', () => {
      beforeEach(() => {
        exerciseStatus = { status: 'invalid' };
        expectedActions = [
          {
            type: types.RESOLVE_EXERCISE_REQUEST,
            guideId,
            courseId,
            exerciseId,
          },
          {
            type: types.EXERCISE_STEP_IS_INVALID,
            guideId,
            courseId,
            exerciseId
          }
        ];
        sandbox
          .stub(exercisesClient, 'resolveExercise')
          .callsFake(() => exerciseStatus);

        return store.dispatch(actions.resolveExercise({
          guideId,
          courseId,
          exerciseId,
          stepList,
          problemInput,
          currentExpression
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when exercise is resolved', () => {
      beforeEach(() => {
        exerciseStatus = { status: 'resolved' };
        expectedActions = [
          {
            type: types.RESOLVE_EXERCISE_REQUEST,
            guideId,
            courseId,
            exerciseId,
          },
          {
            type: types.EXERCISE_RESOLVED,
            guideId,
            courseId,
            exerciseId,
            currentExpression
          }
        ];
        sandbox
          .stub(exercisesClient, 'resolveExercise')
          .callsFake(() => exerciseStatus);

        return store.dispatch(actions.resolveExercise({
          guideId,
          courseId,
          exerciseId,
          stepList,
          problemInput,
          currentExpression
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });
});
