import ExercisesPage from './ExercisesPage';
import {connect} from 'react-redux';

const currentState = (state) => ({
    exercises: state.derivative.data.exercises,
    finishedExercises: state.derivative.data.finishedExercises
});

export default connect(
    currentState
)(ExercisesPage);