import { connect } from 'react-redux';
import * as actions from '../../state/derivative/actions';
import * as selectors from '../../state/derivative/selectors';

import Derivative from './Derivative';

const currentState = (state, { problemInput, problemIndex, className }) => ({
  className,
  problemInput,
  stepList: selectors.stepList(state, problemIndex),
  isValidInput: selectors.isValidInput(state, problemIndex),
  currentExpression: selectors.currentExpression(state, problemIndex)
});

const currentActions = (dispatch) => ({
  onValidateStep: (payload) => dispatch(actions.validateStep(payload)),
  onContentChange: (payload) => dispatch(actions.changeContent(payload))
});

export default connect(
  currentState,
  currentActions
)(Derivative);
