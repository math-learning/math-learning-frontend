import queryString from 'query-string';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import configs from '../../../../configs/variables';
import * as actions from '../../../../state/exercises/actions';
import * as selectors from '../../../../state/exercises/selectors';
import ExercisePage from './ExercisePage';

const currentState = (state, { match, location }) => {
  const { userId } = queryString.parse(location.search);
  const { courseId, guideId, exerciseId } = match.params;
  const exercise = selectors.getExercise(state, {
    courseId, guideId, exerciseId, userId
  });
  const allResolutions = selectors.getallResolutions(state, {
    courseId, guideId, exerciseId, userId
  });
  const isLoadingExercise = selectors.isLoadingExercise(state, {
    courseId, guideId, exerciseId, userId
  });

  return {
    courseId,
    guideId,
    exerciseId,
    userId,
    exercise,
    allResolutions,
    isLoadingExercise
  };
};

const currentActions = (dispatch, { match, location }) => {
  const { userId } = queryString.parse(location.search);
  const { courseId, guideId, exerciseId } = match.params;

  return {
    onLoadExercise: () => dispatch(actions.getExercise({ courseId, guideId, exerciseId, userId })),
    onReturnToCourse: async () => {
      await dispatch(push(configs.pathGenerators.courseUserGuide(courseId, guideId, userId)));
    },
    onGetAllResolutions: () => dispatch(actions.getallResolutions({ courseId, guideId, exerciseId, userId }))
  };
};

export default connect(
  currentState,
  currentActions,
)(ExercisePage);
