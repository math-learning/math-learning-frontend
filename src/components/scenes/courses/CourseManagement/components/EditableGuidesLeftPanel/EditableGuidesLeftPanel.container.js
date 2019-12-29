import { connect } from 'react-redux';
import * as actions from '../../../../../../state/guides/actions';
import EditableGuidesLeftPanel from './EditableGuidesLeftPanel';
import { selectors } from '../../../../../../state/guides';

const currentState = (state, { courseId }) => ({
  guides: selectors.getGuides(state, courseId),
});

const currentActions = (dispatch) => ({
  updateGuide: (payload) => dispatch(actions.updateGuide(payload)),
  createGuide: (payload) => dispatch(actions.createGuide(payload)),
  selectGuide: (payload) => dispatch(actions.selectGuide(payload)),
});

export default connect(
  currentState,
  currentActions
)(EditableGuidesLeftPanel);
