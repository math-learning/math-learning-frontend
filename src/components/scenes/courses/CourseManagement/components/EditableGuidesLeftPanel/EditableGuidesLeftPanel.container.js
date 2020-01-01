import { connect } from 'react-redux';
import * as actions from '../../../../../../state/guides/actions';
import EditableGuidesLeftPanel from './EditableGuidesLeftPanel';
import { selectors } from '../../../../../../state/guides';
import * as modalActions from '../../../../../../state/modals/actions';
import * as modalTypes from '../../../../../../state/modals/modalTypes';

const currentState = (state, { courseId }) => ({
  guides: selectors.getGuides(state, courseId),
});

const currentActions = (dispatch) => ({
  updateGuide: (payload) => dispatch(actions.updateGuide(payload)),
  createGuide: (payload) => dispatch(actions.createGuide(payload)),
  selectGuide: (payload) => dispatch(actions.selectGuide(payload)),
  // deleteGuide: (payload) => dispatch(actions.deleteGuide(payload)),
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
)(EditableGuidesLeftPanel);
