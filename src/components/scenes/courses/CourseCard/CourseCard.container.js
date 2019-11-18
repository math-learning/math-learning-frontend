import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import configs from '../../../../configs/variables';
import history from '../../../../store/history';
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

const currentActions = (dispatch, { course }) => ({
  onClickCourse: () => {
    history.push(configs.paths.course(course.courseId));
  }
});

export default withRouter(connect(
  currentState,
  currentActions
)(CourseCard));
