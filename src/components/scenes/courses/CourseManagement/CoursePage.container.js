import { connect } from 'react-redux';
import CoursePage from './CoursePage';
import * as courses from '../../../../state/courses';
import * as guides from '../../../../state/guides';
import * as common from '../../../../state/common';

const currentState = (state, { match }) => {
  const { courseId, guideId } = match.params;
  const isUserPath = /\/courses\/.+\/users/.test(match.path); // TODO: we should not take this approach
  return {
    course: courses.selectors.getCourseDetail(state, courseId),
    isLoadingCourseDetail: courses.selectors.isLoadingCourseDetail(state),
    guides: guides.selectors.getGuides(state, courseId),
    isLoadingGuides: guides.selectors.isLoadingGuides(state),
    profile: common.selectors.profile(state),
    courseId,
    guideId,
    isUserPath
  };
};

const currentActions = (dispatch) => ({
  getCourse: (courseId) => dispatch(courses.actions.getCourse({ courseId })),
  getGuides: (courseId) => dispatch(guides.actions.getGuides({ courseId }))
});

export default connect(
  currentState,
  currentActions,
)(CoursePage);
