import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import Guide from './Guide';
import configs from '../../../../../../configs/variables';
import * as exercises from '../../../../../../state/exercises';
import * as courses from '../../../../../../state/courses';
import * as guides from '../../../../../../state/guides';

const currentState = (state, { courseId, guideId, location }) => {
  const { userId } = queryString.parse(location.search);

  return {
    userId,
    guide: guides.selectors.getGuide(state, courseId, guideId),
    users: courses.selectors.getUsers(state, courseId),
    exercises: exercises.selectors.getExercises(state, courseId, guideId, userId),
    isLoadingExercises: exercises.selectors.isLoadingExercises(state, courseId, guideId, userId)
  };
};

const currentActions = (dispatch) => ({
  getExercises: (payload) => dispatch(exercises.actions.getExercises(payload)),
  onCreateExercise: async ({ courseId, guideId }) => {
    await dispatch(push(configs.pathGenerators.createExerciseGuide(courseId, guideId)));
  },
  onFilterUser: async ({ courseId, guideId, userId }) => {
    await dispatch(push(configs.pathGenerators.courseUserGuide(courseId, guideId, userId)));
  }
});

export default withRouter(connect(
  currentState,
  currentActions,
)(Guide));
