import { connect } from 'react-redux';
import Exercise from './Exercise';
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
  },
  onEditExercise: (payload) => {
    dispatch(modalActions.loadModal(modalTypes.EDIT_EXERCISE_MODAL, payload));
  },
});

export default connect(
  null,
  currentActions,
)(Exercise);
