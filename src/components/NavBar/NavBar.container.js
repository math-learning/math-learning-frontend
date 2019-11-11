import { connect } from 'react-redux';
import configs from '../../configs/variables';
import * as common from '../../state/common';
import * as commonActions from '../../state/common/actions';
import * as actions from '../../state/modals/actions';
import * as modalTypes from '../../state/modals/modalTypes';
import NavBar from './NavBar';

const currentState = (state) => ({
  profile: common.selectors.profile(state),
  googleClientId: configs.credentials.google.clientId
});

const currentActions = (dispatch) => ({
  onGoogleLogin: (googleUserProfile) => {
    dispatch(commonActions.onGoogleLogin(googleUserProfile));
    dispatch(commonActions.login());
  },
  onSignUp: () => dispatch(actions.loadModal(modalTypes.LOGIN_MODAL))
});

export default connect(
  currentState,
  currentActions,
)(NavBar);
