import { connect } from 'react-redux';
import * as statisticActions from '../../../../../../../state/statistics/actions';
import * as statisticSelectors from '../../../../../../../state/statistics/selectors';
import ExerciseStepCountPage from './ExerciseStepCountPage';

const currentState = (state, { course }) => {
  const statistics = statisticSelectors.getCourseExerciseStepCount(state, { courseId: course.courseId });

  return {
    statistics
  };
};

const currentActions = (dispatch) => ({
  getCourseExerciseStepCount: (courseId) => dispatch(statisticActions.getCourseExerciseStepCount({ courseId })),
});

export default connect(
  currentState,
  currentActions
)(ExerciseStepCountPage);
