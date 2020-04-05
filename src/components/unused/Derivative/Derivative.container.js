import { connect } from 'react-redux';
import * as actions from '../derivative/actions';
import * as selectors from '../derivative/selectors';

import Derivative from './Derivative';

const currentState = (state, { problemInput, problemIndex, className }) => ({
  className,
  problemInput,
  stepList: selectors.stepList(state, problemIndex),
  isValidInput: selectors.isValidInput(state, problemIndex),
  currentExpression: selectors.currentExpression(state, problemIndex),
  isFinished: selectors.isFinished(state, problemIndex),
  showFinishedExercise: selectors.showFinishedExercise(state),
});

const currentActions = (dispatch) => ({
  onValidateStep: (payload) => dispatch(actions.validateStep(payload)),
  onContentChange: (payload) => dispatch(actions.changeContent(payload)),
  onCloseExerciseSolvedDialog: () => dispatch(actions.closeExerciseSolvedDialog()),
});

export default connect(
  currentState,
  currentActions,
)(Derivative);
