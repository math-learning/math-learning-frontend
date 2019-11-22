import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../../state/modals/selectors';

/** Modal Components */
import LoginModal from '../LoginModal';
import CreateCourseModal from '../CreateCourseModal';
import CreateExerciseModal from '../CreateExerciseModal';
import RegistrationModal from '../RegistrationModal';

/** Modal Type Constants */
import {
  LOGIN_MODAL, CREATE_EXERCISE_MODAL, CREATE_COURSE_MODAL, REGISTRATION_MODAL
} from '../../../state/modals/modalTypes';

const MODAL_COMPONENTS = {
  [LOGIN_MODAL]: LoginModal,
  [CREATE_COURSE_MODAL]: CreateCourseModal,
  [CREATE_EXERCISE_MODAL]: CreateExerciseModal,
  [REGISTRATION_MODAL]: RegistrationModal
};

const ModalContainer = (props) => {
  const { modalType, modalParams } = props;

  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];

  return <SpecificModal modalParams={modalParams} />;
};

const currentState = (state) => ({
  modalType: selectors.modalType(state)
});

export default connect(currentState)(ModalContainer);
