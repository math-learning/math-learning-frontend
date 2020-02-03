import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as commonActions from '../../../state/common/actions';
import * as modalActions from '../../../state/modals/actions';
import * as modalSelector from '../../../state/modals/selectors';
import configs from '../../../configs/variables';

import SessionExpiredModal from './SessionExpiredModal';

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
    onClose: async () => {
      dispatch(modalActions.hideModal());
      await dispatch(push(configs.paths.main));
    }
  };
};

export default connect(
  currentState,
  null,
  mergeProps
)(SessionExpiredModal);
