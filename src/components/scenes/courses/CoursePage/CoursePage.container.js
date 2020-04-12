import { connect } from 'react-redux';
import CoursePage from './CoursePage';
import * as userUtils from '../../../../utils/userUtils';
import * as courses from '../../../../state/courses';
import * as guides from '../../../../state/guides';
import * as common from '../../../../state/common';

const currentState = (state, { match }) => {
  const { courseId, guideId } = match.params;
  const isUserPath = /\/courses\/.+\/users/.test(match.path); // TODO: we should not take this approach
  const isStatisticsPath = /\/courses\/.+\/statistics/.test(match.path);
  const isCreateExercisePath = /\/courses\/.+\/create-exercise/.test(match.path);
  const course = courses.selectors.getCourseDetail(state, courseId);
  const profile = common.selectors.profile(state);
  const isProfessor = userUtils.isProfessorOfCourse({ profile, course });

  return {
    isLoadingCourse: courses.selectors.isLoadingCourse(state, courseId),
    guides: guides.selectors.getGuides(state, courseId),
    profile,
    course,
    courseId,
    guideId,
    isUserPath,
    isStatisticsPath,
    isCreateExercisePath,
    isProfessor
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
