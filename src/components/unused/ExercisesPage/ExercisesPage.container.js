import { connect } from 'react-redux';
import ExercisesPage from './ExercisesPage';

const currentState = (state) => ({
  exercises: state.derivative.data.exercises,
  finishedExercises: state.derivative.data.finishedExercises,
});

export default connect(
  currentState,
)(ExercisesPage);
