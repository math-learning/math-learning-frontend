import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../state/exercises/actions';
import * as selectors from '../../../../state/exercises/selectors';
import * as modalTypes from '../../../../state/modals/modalTypes';
import * as modalActions from '../../../../state/modals/actions';

import Derivative from './Derivative';

const currentState = (state, { exercise }) => {
  const currentExpression = selectors.currentExpression(state, { ...exercise });
  const exerciseStatus = selectors.exerciseStatus(state, { ...exercise });
  const isProcessing = exerciseStatus === 'processing';
  const isInvalid = exerciseStatus === 'invalid';
  const isResolved = exercise.state === 'resolved';
  const isDelivered = exercise.state === 'delivered';

  return {
    currentExpression,
    isDelivered,
    isInvalid,
    isProcessing,
    isResolved,
  };
};

const currentActions = (dispatch, { exercise, userId }) => ({
  onValidateStep: (exerciseProps) => {
    dispatch(actions.resolveExercise({
      ...exercise,
      ...exerciseProps
    }));
  },
  onContentChange: (currentExpression) => {
    dispatch(actions.changeCurrentExpression({
      ...exercise,
      currentExpression
    }));
  },
  onDeleteStep: () => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Desea borrar el paso anterior ?',
      explanation: 'Al borrar el paso anterior, no podrás recuperarlo',
      acceptButton: 'Borrar paso',
      actionProps: {
        guideId: exercise.guideId,
        courseId: exercise.courseId,
        exerciseId: exercise.exerciseId
      },
      actionFunction: actions.deleteExerciseStep
    }));
  },
  onDeliverExercise: () => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Desea entregar el ejercicio ?',
      explanation: 'Al entregarlo no podrás volver a editarlo',
      acceptButton: 'Entregar ejercicio',
      actionType: 'ask',
      actionProps: exercise,
      actionFunction: actions.deliverExercise
    }));
  },
  onEditStudentExercise: ({ exerciseProps }) => {
    dispatch(actions.updateStudentExercise({
      courseId: exercise.courseId,
      guideId: exercise.guideId,
      exerciseId: exercise.exerciseId,
      userId,
      ...exerciseProps
    }));
  },
  onOpenHelpModal: () => {
    dispatch(modalActions.loadModal(modalTypes.STEPS_EXERCISE_HELP_MODAL));
  },
});

export default withRouter(connect(
  currentState,
  currentActions,
)(Derivative));
