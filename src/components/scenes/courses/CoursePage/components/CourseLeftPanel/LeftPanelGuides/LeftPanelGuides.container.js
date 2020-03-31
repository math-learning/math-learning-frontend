import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router';
import * as actions from '../../../../../../../state/guides/actions';
import * as selectors from '../../../../../../../state/guides/selectors';
import LeftPanelGuides from './LeftPanelGuides';
import * as modalActions from '../../../../../../../state/modals/actions';
import * as modalTypes from '../../../../../../../state/modals/modalTypes';

const currentState = (state) => ({
  isLoadingCreatingGuide: selectors.isLoadingCreatingGuide(state)
});

const currentActions = (dispatch, { location }) => {
  const { userId } = queryString.parse(location.search);

  return {
    onUpdateGuide: (payload) => dispatch(actions.updateGuide(payload)),
    onCreateGuide: (payload) => dispatch(actions.createGuide(payload)),
    onSelectGuide: ({ courseId, guideId }) => dispatch(actions.selectGuide({ courseId, guideId, userId })),
    onDeleteGuide: (guide) => {
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
  };
};

export default withRouter(connect(
  currentState,
  currentActions
)(LeftPanelGuides));
