import React, { Component } from 'react';
import {
  CircularProgress, Container, Typography, Button
} from '@material-ui/core';
import Exercise from '../Exercise';
import styles from './Guide.module.sass';

export default class Guide extends Component {
  componentDidMount() {
    const {
      isLoadingExercises, getExercises, courseId, guideId
    } = this.props;

    if (isLoadingExercises) {
      getExercises({ courseId, guideId });
    }
  }

  componentDidUpdate() {
    const {
      isLoadingExercises, getExercises, courseId, guideId
    } = this.props;

    if (isLoadingExercises) {
      getExercises({ courseId, guideId });
    }
  }

  render() {
    const {
      courseId, guideId, guide, exercises, showAddExerciseModal, isLoadingExercises, isProfessor
    } = this.props;

    if (isLoadingExercises) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }

    return (
      <div className={styles.exerciseInfo}>
        <div className={styles.exercisesHeader}>
          <Typography align="center" variant="h6" className={styles.guideTitle}>
            Ejercicios ({guide.name})
          </Typography>
          { isProfessor && (
            <div className={styles.addButton}>
              <Button
                onClick={() => showAddExerciseModal({ courseId, guideId })}
                id="create-new-course"
                variant="outlined"
                color="primary"
              >
                Crear nuevo ejercicio
              </Button>
            </div>
          )}
        </div>

        <div className={styles.exerciseList}>
          {exercises.map((exercise) => (
            <Exercise
              key={exercise.exerciseId}
              exercise={exercise}
              isProfessor={isProfessor}
            />
          ))}
        </div>
      </div>
    );
  }
}
