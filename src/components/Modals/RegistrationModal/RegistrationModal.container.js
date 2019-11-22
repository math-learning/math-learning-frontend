import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as courseActions from '../../../state/courses/actions';
import * as modalActions from '../../../state/modals/actions';
import * as modalSelector from '../../../state/modals/selectors';
import * as commonSelector from '../../../state/common/selectors';

import RegistrationModal from './RegistrationModal';

const currentState = (state) => {
  const modalParams = modalSelector.modalParams(state);
  const profile = commonSelector.profile(state);

  return {
    profile,
    course: modalParams.course
  };
};

const currentActions = (dispatch) => ({
  onJoinCourse: (params) => {
    dispatch(courseActions.joinUserToCourse(params));
  },
  onClose: () => dispatch(modalActions.hideModal())
});

export default withRouter(connect(
  currentState,
  currentActions,
)(RegistrationModal));
