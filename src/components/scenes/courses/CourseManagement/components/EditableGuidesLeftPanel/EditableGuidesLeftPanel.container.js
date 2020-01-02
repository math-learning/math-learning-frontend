import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import configs from '../../../../../../configs/variables';
import * as actions from '../../../../../../state/guides/actions';
import EditableGuidesLeftPanel from './EditableGuidesLeftPanel';
import { selectors } from '../../../../../../state/guides';

const currentState = (state, { courseId }) => ({
  guides: selectors.getGuides(state, courseId),
});

const currentActions = (dispatch, { courseId }) => ({
  updateGuide: (payload) => dispatch(actions.updateGuide(payload)),
  createGuide: (payload) => dispatch(actions.createGuide(payload)),
  selectGuide: (payload) => dispatch(actions.selectGuide(payload)),
  loadUsersPage: async () => {
    await dispatch(push(configs.pathGenerators.courseUsers(courseId)));
  }
});

export default connect(
  currentState,
  currentActions
)(EditableGuidesLeftPanel);
