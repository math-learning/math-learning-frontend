import React from 'react';
import { Card, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MathText from '../../../../../MathText/MathText.container';
import styles from './Exercise.module.sass';
import MoreVertOptions from '../Options';

export default function Exercise(props) {
  const {
    exercise, onDeleteExercise, onEditExercise, onClickExercise, isProfessor
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
    <Card onClick={onClickExercise} className={styles.card}>
      <Grid container>
        <Grid item xs={isProfessor ? 9 : 10}>
          <Typography className={styles.tcGray1} variant="h6">
            {exercise.name}
          </Typography>
          <Typography className={styles.problemInputTitle}>Enunciado: Resuelva paso a paso</Typography>
          <MathText content={exercise.problemInput} className={styles.exercise} />
        </Grid>

        <Grid item xs={2}>
          <Typography className={styles.type}>
            Tipo: {exercise.type}
          </Typography>
          {difficultyComponent}
        </Grid>

        <Grid item xs={1}>
          { isProfessor && (
            <div onClick={(event) => event.stopPropagation()}>
              <MoreVertOptions
                options={[{
                  text: 'Editar',
                  onClick: () => onEditExercise({
                    courseId: exercise.courseId,
                    guideId: exercise.guideId,
                    exerciseId: exercise.exerciseId,
                  })
                }, {
                  text: 'Eliminar',
                  onClick: onDeleteExercise
                }]}
              />
            </div>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
