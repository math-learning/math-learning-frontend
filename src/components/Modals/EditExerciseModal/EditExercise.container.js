import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as exerciseActions from '../../../state/exercises/actions';
import * as modalActions from '../../../state/modals/actions';
import * as modalSelector from '../../../state/modals/selectors';

import EditExerciseModal from './EditExerciseModal';

const currentState = (state) => {
  const modalParams = modalSelector.modalParams(state);

  return {
    courseId: modalParams.courseId,
    guideId: modalParams.guideId,
    exerciseId: modalParams.exerciseId,
  };
};

const currentActions = (dispatch) => ({
  onEditExercise: ({
    courseId, guideId, exerciseId, exercise
  }) => {
    dispatch(exerciseActions.updateExerciseAsProfessor({
      courseId,
      guideId,
      exerciseId,
      exercise
    }));
  },
  onClose: () => dispatch(modalActions.hideModal())
});

export default withRouter(connect(
  currentState,
  currentActions,
)(EditExerciseModal));
