import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as courseActions from '../../../state/courses/actions';
import * as modalActions from '../../../state/modals/actions';

import CreateCourseModal from './CreateCourseModal';

const currentActions = (dispatch) => ({
  onCreateCourse: (course) => {
    dispatch(courseActions.createCourse({ course }));
  },
  onClose: () => dispatch(modalActions.hideModal())
});

export default withRouter(connect(
  null,
  currentActions,
)(CreateCourseModal));
