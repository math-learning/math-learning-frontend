import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import GuideManagement from './GuideManagement';
import * as exercises from '../../../../../../state/exercises';
import * as guides from '../../../../../../state/guides';
import * as modalTypes from '../../../../../../state/modals/modalTypes';
import * as modal from '../../../../../../state/modals';

const currentState = (state, { courseId, guideId }) => ({
  exercises: exercises.selectors.getExercises(state, courseId, guideId) || [],
  guide: guides.selectors.getGuide(state, courseId, guideId),
});

const currentActions = (dispatch) => ({
  getExercises: (payload) => dispatch(exercises.actions.getExercises(payload)),
  showAddExerciseModal: (payload) => dispatch(modal.actions.loadModal(modalTypes.CREATE_EXERCISE_MODAL,
    payload))
});

export default withRouter(connect(
  currentState,
  currentActions,
)(GuideManagement));
