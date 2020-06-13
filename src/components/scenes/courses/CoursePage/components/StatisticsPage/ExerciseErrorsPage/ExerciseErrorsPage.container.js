import { connect } from 'react-redux';
import * as statisticActions from '../../../../../../../state/statistics/actions';
import * as statisticSelectors from '../../../../../../../state/statistics/selectors';
import ExerciseErrorsPage from './ExerciseErrorsPage';

const currentState = (state, { course }) => {
  const statistics = statisticSelectors.getCourseExerciseErrors(state, { courseId: course.courseId });

  return {
    statistics
  };
};

const currentActions = (dispatch) => ({
  getCourseExerciseErrors: (courseId) => dispatch(statisticActions.getCourseExerciseErrors({ courseId })),
});

export default connect(
  currentState,
  currentActions
)(ExerciseErrorsPage);
