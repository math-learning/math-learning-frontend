import { connect } from 'react-redux';
// import * as actions from '../../state/commons/actions';

import Main from './Main';

const currentActions = () => ({
  // onSignUp: (payload) => dispatch(actions.signUp(payload)),
  // onLogin: (payload) => dispatch(actions.login(payload))
});

export default connect(
  currentActions,
)(Main);
