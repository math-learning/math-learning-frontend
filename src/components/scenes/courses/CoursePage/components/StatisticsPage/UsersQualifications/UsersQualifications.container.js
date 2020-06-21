import { connect } from 'react-redux';
import * as statisticActions from '../../../../../../../state/statistics/actions';
import * as statisticSelectors from '../../../../../../../state/statistics/selectors';
import * as coursesSelectors from '../../../../../../../state/courses/selectors';
import UsersQualifications from './UsersQualifications';

const currentState = (state, { course }) => {
  const statistics = statisticSelectors.getUsersQualifications(state, { courseId: course.courseId });
  const users = coursesSelectors.getUsers(state, course.courseId);
  const students = users.filter((user) => user.role === 'student');

  return {
    statistics,
    students,
    users
  };
};

const currentActions = (dispatch) => ({
  getUsersQualifications: (courseId) => dispatch(statisticActions.getUsersQualifications({ courseId }))
});

export default connect(
  currentState,
  currentActions
)(UsersQualifications);
