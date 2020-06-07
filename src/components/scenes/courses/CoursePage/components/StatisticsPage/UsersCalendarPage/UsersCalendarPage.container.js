import { connect } from 'react-redux';
import * as statisticActions from '../../../../../../../state/statistics/actions';
import * as statisticSelectors from '../../../../../../../state/statistics/selectors';
import * as courseSelectors from '../../../../../../../state/courses/selectors';
import UsersCalendarPage from './UsersCalendarPage';

const currentState = (state, { course }) => {
  const statistics = statisticSelectors.getCourseUsersActivity(state, { courseId: course.courseId });
  const users = courseSelectors.getUsers(state, course.courseId);

  return {
    users,
    statistics
  };
};

const currentActions = (dispatch) => ({
  getCourseUsersActivity: (courseId) => dispatch(statisticActions.getCourseUsersActivity({ courseId })),
});

export default connect(
  currentState,
  currentActions
)(UsersCalendarPage);
