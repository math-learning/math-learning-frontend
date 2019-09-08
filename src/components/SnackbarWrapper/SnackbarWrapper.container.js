import { connect } from 'react-redux';
import SnackBarWrapper from './SnackbarWrapper';
import { actions, selectors } from '../../state/common';

const currentState = (state) => ({
  variant: selectors.snackbar(state).variant,
  message: selectors.snackbar(state).message,
  open: selectors.snackbar(state).open,
  autoHideDuration: selectors.snackbar(state).autoHideDuration,
});

const currentActions = (dispatch) => ({
  handleClose: () => dispatch(actions.handleClose()),
});

export default connect(
  currentState,
  currentActions,
)(SnackBarWrapper);
