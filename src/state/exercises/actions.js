import * as types from './actionTypes';
import * as modalActions from '../modals/actions';
import * as selectors from './selectors';

// import messages from '../../configs/messages';
import exercisesClient from '../../clients/exercisesClient';

export function createExerciseSuccess({ courseId, guideId, exercise }) {
  return {
    type: types.CREATE_EXERCISE_SUCCESS,
    courseId,
    guideId,
    exercise
  };
}

export function createExercise({ guideId, courseId, exercise }) {
  return async (dispatch, getState) => {
    const state = getState();
    const context = selectors.context(state);

    try {
      const createdExercise = await exercisesClient.createExercise({
        context,
        guideId,
        courseId,
        exercise
      });

      dispatch(createExerciseSuccess({ courseId, guideId, exercise: createdExercise }));
      dispatch(modalActions.hideModal());
    } catch (err) {
      dispatch(modalActions.showError(err.message));
    }
  };
}
