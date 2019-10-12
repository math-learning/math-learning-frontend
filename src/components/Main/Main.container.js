import { connect } from 'react-redux';
import * as actions from '../../state/modals/actions';
import * as modalTypes from '../../state/modals/modalTypes';

import Main from './Main';

const currentState = () => ({ });

const currentActions = (dispatch) => ({
  // onSignUp: () => dispatch(actions.signUp(payload)),
  onLogin: () => dispatch(actions.loadModal(modalTypes.LOGIN_MODAL))
});

export default connect(
  currentState,
  currentActions,
)(Main);
