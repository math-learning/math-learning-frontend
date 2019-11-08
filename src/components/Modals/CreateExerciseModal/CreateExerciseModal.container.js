import { connect } from 'react-redux';
import * as exerciseActions from '../../../state/exercises/actions';
import * as modalActions from '../../../state/modals/actions';
import configs from '../../../configs/variables';

import CreateExerciseModal from './CreateExerciseModal';

const currentState = () => ({}); // TODO: de donde sacamos el courseId y guideId ? de la ruta

const currentActions = (dispatch) => ({
  onCreateExercise: (exercise) => {
    dispatch(exerciseActions.createExercise(exercise));
  },
  onClose: () => dispatch(modalActions.hideModal())
});

export default connect(
  currentState,
  currentActions,
)(CreateExerciseModal);
