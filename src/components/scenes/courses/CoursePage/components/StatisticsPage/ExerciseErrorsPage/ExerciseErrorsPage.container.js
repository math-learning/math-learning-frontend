import { connect } from 'react-redux';
import * as statisticActions from '../../../../../../../state/statistics/actions';
import * as statisticSelectors from '../../../../../../../state/statistics/selectors';
import * as courseSelectors from '../../../../../../../state/courses/selectors';
import ExerciseErrorsPage from './ExerciseErrorsPage';

const currentState = (state, { course }) => {
  const statistics = statisticSelectors.getCourseExerciseErrors(state, { courseId: course.courseId });
  const usersCount = courseSelectors.getUsers(state, course.courseId).length;

  return {
    statistics,
    usersCount
  };
};

const currentActions = (dispatch) => ({
  getCourseExerciseErrors: (courseId) => dispatch(statisticActions.getCourseExerciseErrors({ courseId })),
});

export default connect(
  currentState,
  currentActions
)(ExerciseErrorsPage);
