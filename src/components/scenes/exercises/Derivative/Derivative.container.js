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
  const isResolved = exercise.state === 'resolved';

  return {
    currentExpression,
    exerciseStatus,
    isResolved
  };
};

const currentActions = (dispatch, { exercise }) => ({
  onValidateStep: (exerciseProps) => {
    dispatch(actions.resolveExercise({
      ...exercise,
      ...exerciseProps
    }));
  },
  onContentChange: (expression) => {
    dispatch(actions.changeCurrentExpression({
      ...exercise,
      currentExpression: expression
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
});

export default withRouter(connect(
  currentState,
  currentActions,
)(Derivative));
