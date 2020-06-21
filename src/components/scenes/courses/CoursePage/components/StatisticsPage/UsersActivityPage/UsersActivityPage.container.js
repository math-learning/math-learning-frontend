import { connect } from 'react-redux';
import * as statisticActions from '../../../../../../../state/statistics/actions';
import * as statisticSelectors from '../../../../../../../state/statistics/selectors';
import UsersActivityPage from './UsersActivityPage';

const currentState = (state, { course }) => {
  const statistics = statisticSelectors.getCourseUsersActivity(state, { courseId: course.courseId });

  return {
    statistics
  };
};

const currentActions = (dispatch) => ({
  getCourseUsersActivity: (courseId) => dispatch(statisticActions.getCourseUsersActivity({ courseId }))
});

export default connect(
  currentState,
  currentActions
)(UsersActivityPage);
