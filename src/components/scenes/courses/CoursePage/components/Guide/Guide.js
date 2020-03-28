import React, { Component } from 'react';
import { CircularProgress, Typography, Button } from '@material-ui/core';
import EmptyStatePage from '../../../../../common/containers/EmptyStatePage';
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

  renderEmptyState = () => {
    const { exercises, isProfessor } = this.props;

    if (exercises.length) {
      return null;
    }

    const title = isProfessor
      ? 'Aún no tienes ejercicios para esta guía'
      : 'Esta guía se ha publicado sin ejercicios';
    const subtitle = isProfessor
      ? 'Puedes empezar creando uno!'
      : 'Pide a tu profesor que publique al menos uno!';

    return (
      <EmptyStatePage
        title={title}
        subtitle={subtitle}
      />
    );
  }

  render() {
    const {
      courseId, guideId, guide, exercises, loadExerciseModal, isLoadingExercises, isProfessor
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
          {isProfessor && (
            <div className={styles.addButton}>
              <Button
                onClick={() => loadExerciseModal({ courseId, guideId })}
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
          {this.renderEmptyState()}
        </div>
      </div>
    );
  }
}
