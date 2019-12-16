import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as exerciseActions from '../../../state/exercises/actions';
import * as modalActions from '../../../state/modals/actions';
import * as modalSelector from '../../../state/modals/selectors';

import CreateExerciseModal from './CreateExerciseModal';

const currentState = (state) => {
  const modalParams = modalSelector.modalParams(state);

  return {
    courseId: modalParams.courseId,
    guideId: modalParams.guideId
  };
};

const currentActions = (dispatch) => ({
  onCreateExercise: (exercise) => {
    dispatch(exerciseActions.createExercise(exercise));
  },
  onClose: () => dispatch(modalActions.hideModal())
});

export default withRouter(connect(
  currentState,
  currentActions,
)(CreateExerciseModal));
