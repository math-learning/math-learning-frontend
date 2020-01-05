import React, { Component } from 'react';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'; // TODO: Usually one sass for one component
import ExerciseManagement from '../Exercise';
import styles from './Guide.module.sass';

export default class Guide extends Component {
  componentDidMount() {
    this.updateExercises();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      this.updateExercises();
    }
  }

  updateExercises() {
    const { getExercises, courseId, guide } = this.props;
    if (guide) getExercises({ courseId, guideId: guide.guideId });
  }

  render() {
    const {
      courseId, guide, exercises, showAddExerciseModal, isLoadingExercises, isProfessor
    } = this.props;
    if (!guide) {
      // TODO
      return 'Por favor selecciona una guia';
    }
    const { guideId } = guide;

    if (isLoadingExercises) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }

    return (

      <Container className={styles.exerciseInfo}>

        <div className={styles.exercisesHeader}>
          <Typography align="center" variant="h6" className={styles.guideTitle}>
            Ejercicios ({guide.name})
          </Typography>
          { isProfessor
          && (
            <div className={styles.addButton}>
              <Button
                onClick={() => showAddExerciseModal({ courseId, guideId })}
                id="create-new-course"
                variant="outlined"
                color="primary"
              >
                Crear nueva guia
              </Button>
            </div>
          )}
        </div>

        <div className={styles.exerciseList}>
          {exercises.map((exercise) => (
            <ExerciseManagement
              key={exercise.exerciseId}
              exercise={exercise}
              isProfessor={isProfessor}
            />
          ))}
        </div>

      </Container>

    );
  }
}
