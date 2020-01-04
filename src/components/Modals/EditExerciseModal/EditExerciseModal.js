import React, { Component } from 'react';
import ExerciseModal from '../ExerciseModal/ExerciseModal';

class EditExerciseModal extends Component {
  constructor(props) {
    super(props);
    this.onEditExercise = this.onEditExercise.bind(this);
  }

  onEditExercise = ({
    name,
    type,
    problemInput,
    difficulty,
    description
  }) => {
    const {
      onEditExercise, guideId, courseId, exerciseId
    } = this.props;

    onEditExercise({
      guideId,
      courseId,
      exerciseId,
      exercise: {
        name,
        type,
        problemInput,
        difficulty,
        description
      }
    });
  };

  render() {
    const { onClose } = this.props;
    return (
      <ExerciseModal
        title="Edició de ejercicio"
        actionText="Editar ejercicio"
        onActionClick={this.onEditExercise}
        onClose={onClose}
      />
    );
  }
}

export default EditExerciseModal;
