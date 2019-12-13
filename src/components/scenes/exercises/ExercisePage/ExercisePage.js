import React, { Component } from 'react';
import { Container, Typography, CircularProgress } from '@material-ui/core';

import Derivative from '../Derivative';
import styles from './ExercisePage.module.sass';

export default class ExercisePage extends Component {
  componentDidMount() {
    const { isLoadingExercise, onLoadExercise } = this.props;

    if (isLoadingExercise) {
      onLoadExercise();
    }
  }

  getContent = () => {
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

  render = () => {
    return (
      <Container className={styles.defaultContainer}>
        <Typography
          id="exercise-title"
          variant="h4"
          className={styles.title}
        >
          Resuelva el siguiente ejercicio
        </Typography>
        {this.getContent()}
      </Container>
    );
  };
}
