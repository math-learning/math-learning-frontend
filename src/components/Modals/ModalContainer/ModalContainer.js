import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../../state/modals/selectors';

/** Modal Components */
import LoginModal from '../LoginModal';
import CreateExerciseModal from '../CreateExerciseModal';

/** Modal Type Constants */
import { LOGIN_MODAL, CREATE_EXERCISE_MODAL } from '../../../state/modals/modalTypes';

const MODAL_COMPONENTS = {
  [LOGIN_MODAL]: LoginModal,
  [CREATE_EXERCISE_MODAL]: CreateExerciseModal
};

const ModalContainer = (props) => {
  const { modalType } = props;

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal />;
};

const currentState = (state) => ({
  modalType: selectors.modalType(state)
});

export default connect(currentState)(ModalContainer);
