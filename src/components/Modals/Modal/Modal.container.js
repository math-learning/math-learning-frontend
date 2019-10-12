import { connect } from 'react-redux';
import * as modalActions from '../../../state/modals/actions';
import * as modalSelectors from '../../../state/modals/selectors';

import Modal from './Modal';

const currentState = (state) => ({
  modalError: modalSelectors.modalError(state)
});

const currentActions = (dispatch) => ({
  hideError: () => dispatch(modalActions.hideError())
});

export default connect(
  currentState,
  currentActions,
)(Modal);
