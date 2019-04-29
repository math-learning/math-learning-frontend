import { connect } from 'react-redux';
import MathText from './MathText';

const currentState = (state, { content }) => ({
  content
});

export default connect(
  currentState
)(MathText);
