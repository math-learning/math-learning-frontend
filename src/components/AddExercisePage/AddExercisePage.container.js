import { connect } from 'react-redux';
import { actions, selectors } from '../../state/addExercise';
import AddExercisePage from './AddExercisePage';

const currentState = (state) => ({
  expression: selectors.expression(state),
  result: selectors.result(state),
});

const currentActions = (dispatch) => ({
  handleExpressionChange: (payload) => dispatch(actions.handleAddExpressionChange(payload)),
  handleResultChange: (payload) => dispatch(actions.handleAddResultChange(payload)),
  handleGetResult: (payload) => dispatch(actions.handleGetResult(payload)),
  handleAddExercise: (payload) => dispatch(actions.handleAddExercise(payload)),
});

export default connect(
  currentState,
  currentActions,
)(AddExercisePage);
