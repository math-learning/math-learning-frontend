import queryString from 'query-string';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import configs from '../../../../configs/variables';
import * as actions from '../../../../state/exercises/actions';
import * as selectors from '../../../../state/exercises/selectors';
import * as courses from '../../../../state/courses';
import * as common from '../../../../state/common';
import * as userUtils from '../../../../utils/userUtils';
import ExercisePage from './ExercisePage';

const currentState = (state, { match, location }) => {
  const { userId } = queryString.parse(location.search);
  const { courseId, guideId, exerciseId } = match.params;
  const exercise = selectors.getExercise(state, {
    courseId, guideId, exerciseId, userId
  });
  const isLoadingExercise = selectors.isLoadingExercise(state, {
    courseId, guideId, exerciseId, userId
  });
  const allResolutions = selectors.getAllResolutions(state, {
    courseId, guideId, exerciseId, userId
  });
  const profile = common.selectors.profile(state);
  const course = courses.selectors.getCourseDetail(state, courseId);
  const isProfessor = userUtils.isProfessorOfCourse({ profile, course });

  return {
    courseId,
    guideId,
    exerciseId,
    userId,
    exercise,
    isProfessor,
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
    onGetAllResolutions: () => dispatch(actions.getAllResolutions({ courseId, guideId, exerciseId }))
  };
};

export default connect(
  currentState,
  currentActions,
)(ExercisePage);
