import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Guide from './Guide';
import * as exercises from '../../../../../../state/exercises';
import * as courses from '../../../../../../state/courses';
import * as guides from '../../../../../../state/guides';
import * as modalTypes from '../../../../../../state/modals/modalTypes';
import * as modal from '../../../../../../state/modals';

const currentState = (state, { courseId, guideId }) => ({
  exercises: exercises.selectors.getExercises(state, courseId, guideId),
  guide: guides.selectors.getGuide(state, courseId, guideId),
  users: courses.selectors.getUsers(state, courseId),
  isLoadingExercises: exercises.selectors.isLoadingExercises(state, courseId, guideId)
});

const currentActions = (dispatch) => ({
  getExercises: (payload) => dispatch(exercises.actions.getExercises(payload)),
  loadExerciseModal: (payload) => dispatch(modal.actions.loadModal(modalTypes.CREATE_EXERCISE_MODAL, payload)),
  onFilterUser: (payload) => dispatch(exercises.actions.getUserExercises(payload))
});

export default withRouter(connect(
  currentState,
  currentActions,
)(Guide));
