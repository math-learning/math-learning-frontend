import queryString from 'query-string';
import { connect } from 'react-redux';
import * as actions from '../../../../state/exercises/actions';
import * as selectors from '../../../../state/exercises/selectors';
import ExercisePage from './ExercisePage';

const currentState = (state, { match, location }) => {
  const { userId } = queryString.parse(location.search);
  const { courseId, guideId, exerciseId } = match.params;
  const exercise = selectors.getExercise(state, { courseId, guideId, exerciseId, userId });
  const isLoadingExercise = selectors.isLoadingExercise(state, { courseId, guideId, exerciseId, userId });

  return {
    courseId,
    guideId,
    exerciseId,
    userId,
    exercise,
    isLoadingExercise
  };
};

const currentActions = (dispatch, { match }) => {
  const { courseId, guideId, exerciseId } = match.params;

  return {
    onLoadExercise: () => dispatch(actions.getExercise({ courseId, guideId, exerciseId }))
  };
};

export default connect(
  currentState,
  currentActions,
)(ExercisePage);
