import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as exerciseActions from '../../../state/exercises/actions';
import * as modalActions from '../../../state/modals/actions';

import CreateExerciseModal from './CreateExerciseModal';

const currentState = (state, { location }) => { // eslint-disable-line
  return {
    guideId: 'guia-inventada',
    courseId: 'curso-inventado'
  };
}; // TODO: tomar de location el courseId y guideId para armar el ejercicio

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
