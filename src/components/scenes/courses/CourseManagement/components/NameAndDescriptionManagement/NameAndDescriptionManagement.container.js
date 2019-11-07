import { connect } from 'react-redux';
import NameAndDescriptionManagement from "./NameAndDescriptionManagement";
import { actions, selectors } from '../../../../../../state/courses';

const currentState = (state, { id }) => ({
    course: selectors.getCourseDetail(state, id),
});


const currentActions = (dispatch) => ({
    onNameChange: ({courseId, newValue}) => dispatch(actions.update({
        courseId,
        updatedValues: {
            name: newValue
        }
    })),
    onDescriptionChange: ({courseId, newValue}) => dispatch(actions.update({
        courseId,
        updatedValues: {
            description: newValue
        }
    }
    ))
});

export default connect(
    currentState,
    currentActions,
)(NameAndDescriptionManagement);
