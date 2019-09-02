import {connect} from 'react-redux';
import Footer from './Footer';

const currentState = (state, { node }) => ({
  node
});

export default connect(
  currentState
) (Footer)