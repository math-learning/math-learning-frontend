import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

import Derivative from '../Derivative';
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
    const { isLoadingExercise, exercise } = this.props;

    if (isLoadingExercise) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }

    if (exercise.type === 'derivative') {
      return (
        <Derivative exercise={exercise} />
      );
    }
    return (
      <span>
        Ejercicio cargado
      </span>
    );
  }
}
