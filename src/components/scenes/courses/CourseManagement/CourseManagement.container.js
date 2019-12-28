import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CourseManagement from './CourseManagement';
import * as courses from '../../../../state/courses';
import * as guides from '../../../../state/guides';

const currentState = (state, { courseId, guideId }) => ({
  course: courses.selectors.getCourseDetail(state, courseId),
  isLoadingCourseDetail: courses.selectors.isLoadingCourseDetail(state),
  guides: guides.selectors.getGuides(state, courseId),
  isLoadingGuides: guides.selectors.isLoadingGuides(state),
  courseId,
  guideId,
});

const currentActions = (dispatch) => ({
  getCourse: (courseId) => dispatch(courses.actions.getCourse({ courseId })),
  getGuides: (courseId) => dispatch(guides.actions.getGuides({ courseId }))
});

export default withRouter(connect(
  currentState,
  currentActions,
)(CourseManagement));
