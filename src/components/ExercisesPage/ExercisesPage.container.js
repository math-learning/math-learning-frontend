import ExercisesPage from './ExercisesPage';
import {connect} from 'react-redux';

const currentState = (state, {exercises}) => ({
    exercises
});

export default connect(
    currentState
)(ExercisesPage);