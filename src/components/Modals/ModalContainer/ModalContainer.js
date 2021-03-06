import React from 'react';
import { connect } from 'react-redux';

import * as selectors from '../../../state/modals/selectors';

/** Modal Components */
import LoginModal from '../LoginModal';
import CreateCourseModal from '../CreateCourseModal';
import CreateExerciseModal from '../CreateExerciseModal';
import RegistrationModal from '../RegistrationModal';
import ConfirmActionModal from '../ConfirmActionModal';
import EditExerciseModal from '../EditExerciseModal';
import SessionExpiredModal from '../SessionExpiredModal';
import CopyCourseModal from '../CopyCourseModal';
import StepsExerciseHelpModal from '../StepsExerciseHelpModal';

/** Modal Type Constants */
import {
  LOGIN_MODAL,
  CREATE_EXERCISE_MODAL,
  CREATE_COURSE_MODAL,
  REGISTRATION_MODAL,
  CONFIRM_ACTION_MODAL,
  EDIT_EXERCISE_MODAL,
  SESSION_EXPIRED_MODAL,
  COPY_COURSE_MODAL,
  STEPS_EXERCISE_HELP_MODAL
} from '../../../state/modals/modalTypes';

const MODAL_COMPONENTS = {
  [LOGIN_MODAL]: LoginModal,
  [CREATE_COURSE_MODAL]: CreateCourseModal,
  [CREATE_EXERCISE_MODAL]: CreateExerciseModal,
  [REGISTRATION_MODAL]: RegistrationModal,
  [CONFIRM_ACTION_MODAL]: ConfirmActionModal,
  [EDIT_EXERCISE_MODAL]: EditExerciseModal,
  [SESSION_EXPIRED_MODAL]: SessionExpiredModal,
  [COPY_COURSE_MODAL]: CopyCourseModal,
  [STEPS_EXERCISE_HELP_MODAL]: StepsExerciseHelpModal
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
