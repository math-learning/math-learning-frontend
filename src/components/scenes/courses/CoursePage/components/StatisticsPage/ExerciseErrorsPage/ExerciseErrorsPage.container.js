import { connect } from 'react-redux';
import * as statisticActions from '../../../../../../../state/statistics/actions';
import * as statisticSelectors from '../../../../../../../state/statistics/selectors';
import * as courses from '../../../../../../../state/courses';
import ExerciseErrorsPage from './ExerciseErrorsPage';

const currentState = (state, { course }) => {
  const statistics = statisticSelectors.getCourseExerciseErrors(state, { courseId: course.courseId });
  const users = courses.selectors.getUsers(state, course.courseId);
  const students = users.filter((user) => user.role === 'student');

  return {
    statistics,
    students
  };
};

const currentActions = (dispatch) => ({
  getCourseExerciseErrors: (courseId) => dispatch(statisticActions.getCourseExerciseErrors({ courseId })),
});

export default connect(
  currentState,
  currentActions
)(ExerciseErrorsPage);
