import { connect } from 'react-redux';
import ExerciseCard from './ExerciseCard';

const currentState = (state, { content, onClick }) => ({
  content,
  onClick,
});

export default connect(
  currentState,
)(ExerciseCard);
