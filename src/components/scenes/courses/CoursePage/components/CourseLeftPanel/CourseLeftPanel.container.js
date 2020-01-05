import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import configs from '../../../../../../configs/variables';
import * as actions from '../../../../../../state/guides/actions';
import CourseLeftPanel from './CourseLeftPanel';
import { selectors } from '../../../../../../state/guides';
import * as modalActions from '../../../../../../state/modals/actions';
import * as modalTypes from '../../../../../../state/modals/modalTypes';

const currentState = (state, { courseId }) => ({
  guides: selectors.getGuides(state, courseId),
});

const currentActions = (dispatch, { courseId }) => ({
  updateGuide: (payload) => dispatch(actions.updateGuide(payload)),
  createGuide: (payload) => dispatch(actions.createGuide(payload)),
  selectGuide: (payload) => dispatch(actions.selectGuide(payload)),
  loadUsersPage: async () => {
    await dispatch(push(configs.pathGenerators.courseUsers(courseId)));
  },
  deleteGuide: (guide) => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Realmente desea eliminar la guia ?',
      explanation: 'Al hacerlo, no podrás recuperarla',
      acceptButton: 'Eliminar guia',
      actionProps: {
        guideId: guide.guideId,
        courseId: guide.courseId,
      },
      actionFunction: actions.deleteGuide
    }));
  }
});

export default connect(
  currentState,
  currentActions
)(CourseLeftPanel);
