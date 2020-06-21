import { connect } from 'react-redux';
import CourseHeader from './CourseHeader';
import { actions } from '../../../../../../state/courses';
import * as modalActions from '../../../../../../state/modals/actions';
import * as modalTypes from '../../../../../../state/modals/modalTypes';

const currentActions = (dispatch, { course: { courseId } }) => ({
  onNameChange: ({ newValue }) => dispatch(actions.updateCourse({
    courseId,
    updatedValues: {
      name: newValue
    }
  })),
  onDescriptionChange: ({ newValue }) => dispatch(actions.updateCourse({
    courseId,
    updatedValues: {
      description: newValue
    }
  })),
  onCopyCourse: () => {
    dispatch(modalActions.loadModal(modalTypes.COPY_COURSE_MODAL, { courseId }));
  },
  onDeleteCourse: () => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Realmente desea eliminar el curso ?',
      explanation: 'Al hacerlo, no podrás recuperarlo',
      acceptButton: 'Eliminar curso',
      actionProps: { courseId, },
      actionFunction: actions.deleteCourse
    }));
  },
  onPublishCourse: () => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Desear publicar el curso ?',
      explanation: 'Al hacerlo quedará publicado para que los alumnos se puedan unir',
      acceptButton: 'Publicar curso',
      actionProps: { courseId },
      actionType: 'ask',
      actionFunction: actions.publishCourse
    }));
  },
});

export default connect(
  null,
  currentActions,
)(CourseHeader);
