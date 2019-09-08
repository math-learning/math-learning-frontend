import { connect } from 'react-redux';

import SignUpButton from './SignUpButton';

const currentState = (state, { size, className, onClick }) => ({
  size,
  onClick,
  className
});

export default connect(
  currentState
)(SignUpButton);
