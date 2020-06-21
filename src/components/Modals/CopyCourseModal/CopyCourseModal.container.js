import { connect } from 'react-redux';
import * as courseActions from '../../../state/courses/actions';
import * as modalActions from '../../../state/modals/actions';
import * as modalSelector from '../../../state/modals/selectors';

import CopyCourseModal from './CopyCourseModal';

const currentState = (state) => {
  const modalParams = modalSelector.modalParams(state);

  return {
    sourceCourseId: modalParams.courseId,
    isActionLoading: modalSelector.isActionLoading(state)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { sourceCourseId } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    onCopyCourse: (course) => {
      dispatch(courseActions.copyCourse({ course, sourceCourseId }));
    },
    onClose: () => dispatch(modalActions.hideModal())
  };
};

export default connect(
  currentState,
  null,
  mergeProps
)(CopyCourseModal);
