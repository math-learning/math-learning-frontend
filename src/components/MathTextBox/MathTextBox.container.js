import { connect } from 'react-redux';
import MathTextBox from './MathTextBox';

const currentState = (state, { content, onContentChange, onEnter }) => ({
  content,
  onEnter,
  onContentChange
});

export default connect(
  currentState
)(MathTextBox);
