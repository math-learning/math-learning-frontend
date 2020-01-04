import React from 'react';
import { Card, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MathText from '../../../../../MathText/MathText.container';
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
        Facil
      </Typography>
    );
  } else if (exercise.difficulty === 'medium') {
    difficultyComponent = (
      <Typography className={styles.tcYellow}>
        Intermedio
      </Typography>
    );
  } else if (exercise.difficulty === 'hard') {
    difficultyComponent = (
      <Typography className={styles.tcRed}>
        Dificil
      </Typography>
    );
  }

  return (
    <Card className={styles.card}>
      <div className={styles.displayLine}>
        <div className={styles.fullWidth}>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant={'h5'} className={styles.tcGray1}>
                {exercise.name}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {difficultyComponent}
            </Grid>
          </Grid>


          <Typography className={styles.tcGray1}>
                  Tipo:
            {exercise.type}
          </Typography>

          <Typography className={styles.tcGray1}>Enunciado: Resuelva paso a paso</Typography>
          <span>
            <MathText content={exercise.exercise} className={styles.exercise} />
          </span>

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
