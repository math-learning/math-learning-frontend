import { connect } from 'react-redux';
import * as commonActions from '../../../state/common/actions';
import * as modalActions from '../../../state/modals/actions';
import configs from '../../../configs/variables';

import LoginModal from './LoginModal';

const currentState = () => ({
  googleClientId: configs.credentials.google.clientId
});

const currentActions = (dispatch) => ({
  onGoogleLogin: (googleUserProfile) => {
    dispatch(commonActions.onGoogleLogin(googleUserProfile));
    dispatch(commonActions.login());
  },
  onClose: () => dispatch(modalActions.hideModal()),
  onGoogleSignUp: (googleUserProfile, userMetadata) => {
    dispatch(commonActions.onGoogleLogin(googleUserProfile));
    dispatch(commonActions.signUp(userMetadata));
  }
});

export default connect(
  currentState,
  currentActions,
)(LoginModal);
