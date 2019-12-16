import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../../state/exercises/actions';
import * as selectors from '../../../../state/exercises/selectors';
import Derivative from './Derivative';

const currentState = (state, { problemInput, className, exercise }) => {
  const currentExpression = selectors.currentExpression(state, { ...exercise });
  const exerciseStatus = selectors.exerciseStatus(state, { ...exercise });
  const isResolved = selectors.isExerciseResolved(state, { ...exercise });
  const stepList = selectors.stepList(state, { ...exercise });

  return {
    className,
    currentExpression,
    exerciseStatus,
    stepList,
    isResolved,
    problemInput
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
});

export default withRouter(connect(
  currentState,
  currentActions,
)(Derivative));
