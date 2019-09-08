import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import * as common from '../../state/common';

const currentState = (state) => ({
  isVisible: common.selectors.progressbar(state).isVisible,
});

export default connect(
  currentState,
)(ProgressBar);
