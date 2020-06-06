import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

import Derivative from '../Derivative';
import Integrate from '../Integrate';
import styles from './ExercisePage.module.sass';

export default class ExercisePage extends Component {
  componentDidMount() {
    const { isLoadingExercise, onLoadExercise } = this.props;

    if (isLoadingExercise) {
      onLoadExercise();
    }
  }

  componentDidUpdate() {
    const { isLoadingExercise, onLoadExercise } = this.props;

    if (isLoadingExercise) {
      onLoadExercise();
    }
  }

  render = () => {
    const { isLoadingExercise, exercise, onReturnToCourse } = this.props;

    if (isLoadingExercise) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }
    if (exercise.type === 'derivative') {
      return (
        <Derivative
          exercise={exercise}
          onReturnToCourse={onReturnToCourse}
        />
      );
    }
    if (exercise.type === 'integral') {
      return (
        <Integrate
          exercise={exercise}
          onReturnToCourse={onReturnToCourse}
        />
      );
    }
    return (
      <span>
        Ejercicio cargado
      </span>
    );
  }
}
