import { connect } from 'react-redux';
// import * as actions from '../../state/commons/actions';
import RenderModal from '../LoginModal/LoginModal';

import Main from './Main';

const currentActions = (dispatch) => ({
  // onSignUp: (payload) => dispatch(actions.signUp(payload)),
  onLogin: (payload) => RenderModal()
});

export default connect(
  currentActions,
)(Main);
