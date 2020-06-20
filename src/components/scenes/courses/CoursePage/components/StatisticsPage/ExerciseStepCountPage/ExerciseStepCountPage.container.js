import { connect } from 'react-redux';
import * as statisticActions from '../../../../../../../state/statistics/actions';
import * as statisticSelectors from '../../../../../../../state/statistics/selectors';
import * as courses from '../../../../../../../state/courses';
import ExerciseStepCountPage from './ExerciseStepCountPage';

const currentState = (state, { course }) => {
  const statistics = statisticSelectors.getCourseExerciseStepCount(state, { courseId: course.courseId });
  const users = courses.selectors.getUsers(state, course.courseId);
  const students = users.filter((user) => user.role === 'student');

  return {
    statistics,
    students
  };
};

const currentActions = (dispatch) => ({
  getCourseExerciseStepCount: (courseId) => dispatch(statisticActions.getCourseExerciseStepCount({ courseId })),
});

export default connect(
  currentState,
  currentActions
)(ExerciseStepCountPage);
