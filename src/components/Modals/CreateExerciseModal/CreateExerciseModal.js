import React, { Component } from 'react';
import ExerciseModal from '../ExerciseModal/ExerciseModal';

class CreateExerciseModal extends Component {
  constructor(props) {
    super(props);
    this.onCreateExercise = this.onCreateExercise.bind(this);
  }

  onCreateExercise = ({
    name,
    type,
    problemInput,
    difficulty,
    description
  }) => {
    const { onCreateExercise, guideId, courseId } = this.props;

    onCreateExercise({
      guideId,
      courseId,
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
        onClose={onClose}
        title="Creación de ejercicio"
        actionText="Crear ejercicio"
        onActionClick={this.onCreateExercise}
      />
    );
  }
}

export default CreateExerciseModal;
