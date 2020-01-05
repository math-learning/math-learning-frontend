import React from 'react';
import { Card, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MathText from '../../../../../MathText/MathText.container';
// eslint-disable-next-line no-unused-vars
import overrideImport from './overrideMathTextStyles.css';
import styles from './Exercise.module.sass';
import MoreVertOptions from '../Options';

export default function Exercise(props) {
  const {
    exercise, onDeleteExercise, onEditExercise, isProfessor
  } = props;

  let difficultyComponent = '';

  if (exercise.difficulty === 'easy') {
    difficultyComponent = (
      <Typography className={styles.tcGreen}>
        Dificultad: Facil
      </Typography>
    );
  } else if (exercise.difficulty === 'medium') {
    difficultyComponent = (
      <Typography className={styles.tcYellow}>
        Dificultad: Intermedio
      </Typography>
    );
  } else if (exercise.difficulty === 'hard') {
    difficultyComponent = (
      <Typography className={styles.tcRed}>
        Dificultad: Dificil
      </Typography>
    );
  }

  return (
    <Card className={styles.card}>
      <div className={styles.displayLine}>
        <div className={styles.fullWidth}>
          <Grid container className={styles.nameAndDifficulty}>
            <Grid item xs={9}>
              <Typography variant="h5" className={styles.tcGray1}>
                {exercise.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {difficultyComponent}
            </Grid>
          </Grid>

          <Typography className={styles.type}>
                  Tipo: {exercise.type}
          </Typography>

          <Typography className={styles.tcGray1}>Enunciado: Resuelva paso a paso</Typography>

          <MathText content={exercise.problemInput} className={styles.exercise} />

        </div>

        { isProfessor
          && (
          <MoreVertOptions
            options={[
              {
                text: 'Editar',
                onClick: () => onEditExercise({
                  courseId: exercise.courseId,
                  guideId: exercise.guideId,
                  exerciseId: exercise.exerciseId,
                })
              }, {
                text: 'Eliminar',
                onClick: onDeleteExercise
              }
            ]}
          />
          )}

      </div>
    </Card>
  );
}
