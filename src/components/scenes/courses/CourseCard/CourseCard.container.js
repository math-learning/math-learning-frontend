import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as commonSelector from '../../../../state/common/selectors';

import CourseCard from './CourseCard';

const currentState = (state, { course }) => {
  const profile = commonSelector.profile(state);
  const isDraft = course.courseStatus === 'draft';
  const isMine = course.professors.find((professor) => (
    professor.userId === profile.userId
  ));

  return {
    profile,
    isMine,
    isDraft
  };
};

const currentActions = (dispatch, { course, onClickCourse }) => ({
  onClickCourse: () => onClickCourse(course)
});

export default withRouter(connect(
  currentState,
  currentActions
)(CourseCard));
