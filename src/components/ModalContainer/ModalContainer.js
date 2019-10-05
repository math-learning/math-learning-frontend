import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../state/modals/selectors';

/** Modal Components */
import LoginModal from '../LoginModal';

/** Modal Type Constants */
import { LOGIN_MODAL } from '../../state/modals/modalTypes';

const MODAL_COMPONENTS = {
  [LOGIN_MODAL]: LoginModal
  // SIGNUP_MODAL: SignupModal
};

const ModalContainer = (props) => {
  const { modalType } = props;

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal />;
};

const currentState = (state) => {
  return {
    modalType: selectors.modalType(state)
  };
};

export default connect(currentState)(ModalContainer);
