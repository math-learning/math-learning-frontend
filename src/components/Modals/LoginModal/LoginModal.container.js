import { connect } from 'react-redux';
import * as commonActions from '../../../state/common/actions';
import * as modalActions from '../../../state/modals/actions';
import * as modalSelector from '../../../state/modals/selectors';
import configs from '../../../configs/variables';

import LoginModal from './LoginModal';

const currentState = (state) => {
  const modalParams = modalSelector.modalParams(state);

  return {
    ...modalParams,
    googleClientId: configs.credentials.google.clientId
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { nextPath } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    onGoogleLogin: (googleUserProfile) => {
      dispatch(commonActions.onGoogleLogin(googleUserProfile));
      dispatch(commonActions.login({ nextPath }));
    },
    onClose: () => dispatch(modalActions.hideModal()),
    onGoogleSignUp: (googleUserProfile, userMetadata) => {
      dispatch(commonActions.onGoogleLogin(googleUserProfile));
      dispatch(commonActions.signUp(userMetadata));
    }
  };
};

export default connect(
  currentState,
  null,
  mergeProps
)(LoginModal);
