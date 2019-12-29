import { connect } from 'react-redux';
import * as actions from '../../../../state/exercises/actions';
import * as selectors from '../../../../state/exercises/selectors';

import ExercisePage from './ExercisePage';

const currentState = (state, { match }) => {
  const { courseId, guideId, exerciseId } = match.params;
  const exercise = selectors.getExercise(state, { courseId, guideId, exerciseId });
  const isLoadingExercise = selectors.isLoadingExercise(state, { courseId, guideId, exerciseId });

  return {
    courseId,
    guideId,
    exerciseId,
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
