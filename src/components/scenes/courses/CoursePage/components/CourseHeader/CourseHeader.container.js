import { connect } from 'react-redux';
import CourseHeader from './CourseHeader';
import { actions, selectors } from '../../../../../../state/courses';
import * as modalActions from '../../../../../../state/modals/actions';
import * as modalTypes from '../../../../../../state/modals/modalTypes';

const currentState = (state, { id }) => {
  const course = selectors.getCourseDetail(state, id);

  return {
    course,
    isCoursePublished: course.courseStatus === 'published'
  };
};

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
  },
  onPublishCourse: () => {
    dispatch(modalActions.loadModal(modalTypes.CONFIRM_ACTION_MODAL, {
      title: '¿ Desear publicar el curso ?',
      explanation: 'Al hacerlo quedará publicado para que los alumnos se puedan unir',
      acceptButton: 'Publicar curso',
      actionProps: {
        courseId: id,
      },
      actionType: 'ask',
      actionFunction: actions.publishCourse
    }));
  },
});

export default connect(
  currentState,
  currentActions,
)(CourseHeader);
