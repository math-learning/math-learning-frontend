import { connect } from 'react-redux';
import NavBar from './NavBar';
import * as common from '../../state/common';

const currentState = (state) => ({
  profile: common.selectors.profile(state),
});

export default connect(
  currentState,
)(NavBar);
