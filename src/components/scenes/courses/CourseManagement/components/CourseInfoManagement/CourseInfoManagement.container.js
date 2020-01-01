import { connect } from 'react-redux';
import CourseInfoManagement from './CourseInfoManagement';
import { actions, selectors } from '../../../../../../state/courses';
import * as modalActions from '../../../../../../state/modals/actions';
import * as modalTypes from '../../../../../../state/modals/modalTypes';

const currentState = (state, { id }) => ({
  course: selectors.getCourseDetail(state, id),
});

const currentActions = (dispatch, { id }) => ({
  onNameChange: ({ courseId, newValue }) => dispatch(actions.update({
    courseId,
    updatedValues: {
      name: newValue
    }
  })),
  onDescriptionChange: ({ courseId, newValue }) => dispatch(actions.update({
    courseId,
    updatedValues: {
      description: newValue
    }
  })),
  onDeleteCourse: () => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Realmente desea eliminar el curso ?',
      explanation: 'Al hacerlo, no podrás recuperarlo',
      acceptButton: 'Eliminar curso',
      actionProps: {
        courseId: id,
      },
      actionFunction: actions.deleteCourse
    }));
  }
});

export default connect(
  currentState,
  currentActions,
)(CourseInfoManagement);
