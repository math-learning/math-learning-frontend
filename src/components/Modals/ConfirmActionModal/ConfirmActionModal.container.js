import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as modalActions from '../../../state/modals/actions';
import * as modalSelector from '../../../state/modals/selectors';

import ConfirmActionModal from './ConfirmActionModal';

const currentState = (state) => {
  const modalParams = modalSelector.modalParams(state);

  return {
    ...modalParams
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    actionProps,
    actionFunction
  } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    onClose: () => dispatch(modalActions.hideModal()),
    onAcceptAction: () => dispatch(actionFunction(actionProps))
  };
};

export default withRouter(connect(
  currentState,
  null,
  mergeProps,
)(ConfirmActionModal));
