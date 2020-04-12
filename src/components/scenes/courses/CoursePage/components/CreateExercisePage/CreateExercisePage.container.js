import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import configs from '../../../../../../configs/variables';
import { actions, selectors } from '../../../../../../state/exercises';
import CreateExercisePage from './CreateExercisePage';

const currentState = (state, { courseId, guideId }) => ({
  isCreatingExercise: selectors.isCreatingExercise(state, courseId, guideId),
  isEvaluatingExercise: selectors.isEvaluatingExercise(state, courseId, guideId),
  solvedCreatingExercise: selectors.solvedCreatingExercise(state, courseId, guideId),
  creatingExerciseError: selectors.creatingExerciseError(state, courseId, guideId)
});

const currentActions = (dispatch) => ({
  onCreateExercise: (exercise) => dispatch(actions.createExercise(exercise)),
  onEvaluateExercise: (exercise) => dispatch(actions.evaluateExercise(exercise)),
  onCancel: async ({ courseId, guideId }) => {
    await dispatch(push(configs.pathGenerators.courseGuide(courseId, guideId)));
  },
  resetExerciseError: () => dispatch(actions.resetExerciseError()),
  resetSolvedExercise: () => dispatch(actions.resetSolvedExercise())
});

export default withRouter(connect(
  currentState,
  currentActions,
)(CreateExercisePage));
