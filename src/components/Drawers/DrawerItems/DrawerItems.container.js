import { connect } from 'react-redux';
import { selectors } from '../../../state/common';
import DrawerItems from './DrawerItems';

const currentState = (state) => ({
  profile: selectors.profile(state)
});

export default connect(
  currentState
)(DrawerItems);
