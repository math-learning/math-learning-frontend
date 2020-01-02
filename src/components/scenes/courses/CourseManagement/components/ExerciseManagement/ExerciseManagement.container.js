import { connect } from 'react-redux';
import ExerciseManagement from './ExerciseManagement';
import * as actions from '../../../../../../state/exercises/actions';
import * as modalTypes from '../../../../../../state/modals/modalTypes';
import * as modalActions from '../../../../../../state/modals/actions';

const currentActions = (dispatch, { exercise }) => ({
  onDeleteExercise: () => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Realmente desea eliminar el ejercicio ?',
      explanation: 'Al hacerlo, no podrás recuperarlo',
      acceptButton: 'Eliminar ejercicio',
      actionProps: {
        guideId: exercise.guideId,
        courseId: exercise.courseId,
        exerciseId: exercise.exerciseId
      },
      actionFunction: actions.deleteExercise
    }));
  }
});

export default connect(
  null,
  currentActions,
)(ExerciseManagement);
