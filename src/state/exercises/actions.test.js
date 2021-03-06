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
            type: types.CREATE_EXERCISE_REQUEST,
            guideId,
            courseId
          },
          {
            type: types.CREATE_EXERCISE_SUCCESS,
            guideId,
            courseId,
            exercise: createdExercise
          },
          {
            payload: {
              args: [
                `/courses/${courseId}/guides/${guideId}`
              ],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
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

  describe('evaluateExercise() function', () => {
    let evaluatedExercise;

    describe('when the exercise is created successfully', () => {
      beforeEach(() => {
        exercise = {
          type: 'derivative',
          problemInput: 'x'
        };
        evaluatedExercise = { result: '1' };
        expectedActions = [
          {
            type: types.EVALUATE_EXERCISE_REQUEST,
            guideId,
            courseId
          },
          {
            type: types.EVALUATE_EXERCISE_SUCCESS,
            guideId,
            courseId,
            solvedExercise: '1'
          }
        ];
        sandbox
          .stub(exercisesClient, 'evaluateExercise')
          .callsFake(() => evaluatedExercise);

        return store.dispatch(actions.evaluateExercise({ guideId, courseId, exercise }));
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
            exercise,
            userId: undefined
          }
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

    describe('when the exercise is getted successfully for a userId', () => {
      beforeEach(() => {
        const userId = 'user';
        exerciseId = 'exercise-id';
        exercise = { name: 'ex name' };
        expectedActions = [
          {
            type: types.GET_USER_EXERCISE_SUCCESS,
            guideId,
            courseId,
            exerciseId,
            exercise,
            userId
          }
        ];
        sandbox
          .stub(exercisesClient, 'getExercise')
          .callsFake(() => exercise);

        return store.dispatch(actions.getExercise({ guideId, courseId, exerciseId, userId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('resolveExercise() function', () => {
    let exerciseStatus;
    let currentExpression;

    beforeEach(() => {
      currentExpression = '2';
      exerciseId = 'exercise-id';
    });

    describe('when exercise is valid', () => {
      beforeEach(() => {
        exerciseStatus = { exerciseStatus: 'valid' };
        expectedActions = [
          {
            type: types.RESOLVE_EXERCISE_REQUEST,
            guideId,
            courseId,
            exerciseId
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
          currentExpression
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when exercise is invalid', () => {
      beforeEach(() => {
        exerciseStatus = { exerciseStatus: 'invalid', hints: [] };
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
            exerciseId,
            result: exerciseStatus
          }
        ];
        sandbox
          .stub(exercisesClient, 'resolveExercise')
          .callsFake(() => exerciseStatus);

        return store.dispatch(actions.resolveExercise({
          guideId,
          courseId,
          exerciseId,
          currentExpression
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when exercise is resolved', () => {
      beforeEach(() => {
        exerciseStatus = { exerciseStatus: 'resolved' };
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
          currentExpression
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('removeExerciseStep() function', () => {
    beforeEach(() => {
      exerciseId = 'exercise-id';
    });

    describe('when exercise is deleted successfully', () => {
      beforeEach(() => {
        store = mockStore({
          common: {
            data: {}
          },
          exercises: {
            data: {
              detail: {
                [`${courseId}/${guideId}`]: {
                  [exerciseId]: { id: 'current-course' }
                }
              }
            }
          }
        });
        expectedActions = [
          {
            type: types.REMOVE_EXERCISE_STEP,
            guideId,
            courseId,
            exerciseId
          },
          { type: modalTypes.HIDE_MODAL }
        ];
        sandbox
          .stub(exercisesClient, 'removeExerciseStep')
          .callsFake(() => {});

        return store.dispatch(actions.deleteExerciseStep({
          guideId,
          courseId,
          exerciseId
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when deleting fails', () => {
      beforeEach(() => {
        store = mockStore({
          common: {
            data: {}
          },
          exercises: {
            data: {
              detail: {
                [`${courseId}/${guideId}`]: {
                  [exerciseId]: {
                    exercise: { id: 'current-course' }
                  }
                }
              }
            }
          }
        });
        expectedActions = [
          {
            type: types.REMOVE_EXERCISE_STEP,
            guideId,
            courseId,
            exerciseId
          },
          { type: modalTypes.HIDE_MODAL },
          {
            type: types.UPDATE_EXERCISE,
            guideId,
            courseId,
            exerciseId,
            exercise: { id: 'current-course' }
          }
        ];
        sandbox
          .stub(exercisesClient, 'removeExerciseStep')
          .callsFake(() => {
            throw new Error();
          });

        return store.dispatch(actions.deleteExerciseStep({
          guideId,
          courseId,
          exerciseId
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('deleteExercise() function', () => {
    describe('when the exercise is deleted successfully', () => {
      beforeEach(() => {
        exerciseId = 'exercise-id';
        expectedActions = [
          {
            type: types.DELETE_EXERCISE_REQUEST,
            guideId,
            courseId,
            exerciseId
          },
          { type: modalTypes.HIDE_MODAL }
        ];
        sandbox
          .stub(exercisesClient, 'deleteExercise')
          .callsFake(() => {});

        return store.dispatch(actions.deleteExercise({ guideId, courseId, exerciseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('deliverExercise() function', () => {
    describe('when the exercise is deleted successfully', () => {
      beforeEach(() => {
        exerciseId = 'exercise-id';
        expectedActions = [
          {
            type: types.DELIVER_EXERCISE_REQUEST,
            guideId,
            courseId,
            exerciseId
          },
          { type: modalTypes.HIDE_MODAL }
        ];
        sandbox
          .stub(exercisesClient, 'deliverExercise')
          .callsFake(() => {});

        return store.dispatch(actions.deliverExercise({ guideId, courseId, exerciseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('getExercises() function', () => {
    let exercises;

    describe('when the exercise is getted successfully', () => {
      beforeEach(() => {
        exercises = [{ name: 'ex name' }];
        expectedActions = [
          {
            type: types.GET_EXERCISES_REQUEST,
            guideId,
            courseId,
            userId: undefined
          },
          {
            type: types.GET_EXERCISES_SUCCESS,
            guideId,
            courseId,
            exercises,
            userId: undefined
          }
        ];
        sandbox
          .stub(exercisesClient, 'getExercises')
          .callsFake(() => exercises);

        return store.dispatch(actions.getExercises({ guideId, courseId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });

    describe('when the exercise is getted successfully for a userId', () => {
      beforeEach(() => {
        const userId = 'user';
        exercises = [{ name: 'ex name' }];
        expectedActions = [
          {
            type: types.GET_EXERCISES_REQUEST,
            guideId,
            courseId,
            userId
          },
          {
            type: types.GET_USER_EXERCISES_SUCCESS,
            guideId,
            courseId,
            exercises,
            userId
          }
        ];
        sandbox
          .stub(exercisesClient, 'getExercises')
          .callsFake(() => exercises);

        return store.dispatch(actions.getExercises({ guideId, courseId, userId }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('updateExerciseAsProfessor() function', () => {
    describe('when the exercise is updated successfully', () => {
      beforeEach(() => {
        exerciseId = 'exercise-id';
        exercise = { name: 'ex name' };
        expectedActions = [
          {
            type: types.UPDATE_EXERCISE,
            guideId,
            courseId,
            exerciseId,
            exercise
          },
          { type: modalTypes.HIDE_MODAL }
        ];
        sandbox
          .stub(exercisesClient, 'updateExerciseAsProfessor')
          .callsFake(() => exercise);

        return store.dispatch(actions.updateExerciseAsProfessor({
          guideId, courseId, exerciseId, exercise
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('updateStudentExercise() function', () => {
    let calification;
    let userId;

    describe('when the exercise is updated successfully', () => {
      beforeEach(() => {
        exerciseId = 'exercise-id';
        calification = 1;
        userId;
        expectedActions = [
          {
            type: types.UPDATE_STUDENT_EXERCISE_SUCCESS,
            guideId,
            courseId,
            exerciseId,
            userId,
            exerciseProps: { calification }
          }
        ];
        sandbox
          .stub(exercisesClient, 'updateUserExercise')
          .callsFake(() => {});

        return store.dispatch(actions.updateStudentExercise({
          guideId, courseId, exerciseId, userId, calification
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });

  describe('checkPipelineStatus() function', () => {
    let mock;

    describe('when the exercise is updated successfully', () => {
      beforeEach(() => {
        exerciseId = 'exercise-id';
        expectedActions = [
          {
            type: types.UPDATE_PIPELINE_STATUS,
            guideId,
            courseId,
            exerciseId,
            pipelineStatus: 'generated'
          }
        ];
        mock = sandbox.stub(exercisesClient, 'checkPipelineStatus');
        mock.onCall(0).resolves({ pipelineStatus: 'waiting' });
        mock.onCall(1).resolves({ pipelineStatus: 'generated' });

        return store.dispatch(actions.checkPipelineStatus({
          guideId, courseId, exerciseId
        }));
      });

      it('executes the expected actions and makes to status calls', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
        expect(mock.callCount).to.equal(2);
      });
    });
  });

  describe('getAllResolutions() function', () => {
    describe('when the exercise is updated successfully', () => {
      let resolutions;

      beforeEach(() => {
        resolutions = [];
        exerciseId = 'exercise-id';
        expectedActions = [
          {
            type: types.GET_ALL_RESOLUTIONS_SUCCESS,
            guideId,
            courseId,
            exerciseId,
            resolutions
          }
        ];
        sandbox.stub(exercisesClient, 'getAllResolutions').callsFake(() => resolutions);

        return store.dispatch(actions.getAllResolutions({
          guideId, courseId, exerciseId
        }));
      });

      it('executes the expected actions', () => {
        expect(store.getActions()).to.be.deep.equal(expectedActions);
      });
    });
  });
});
