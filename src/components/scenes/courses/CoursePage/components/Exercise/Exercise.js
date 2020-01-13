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
      <div className={styles.displayLine}>
        <div className={styles.fullWidth}>
          <Grid container className={styles.nameAndDifficulty}>
            <Grid item xs={5}>
              <Typography variant="h5" className={styles.tcGray1}>
                {exercise.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={styles.type}>
                Tipo: {exercise.type}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {difficultyComponent}
            </Grid>
            <Grid item xs={1}>
              { isProfessor && (
                <div onClick={(event) => event.stopPropagation()}>
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
                </div>
              )}
            </Grid>
          </Grid>

          <Typography className={styles.problemInputTitle}>Enunciado: Resuelva paso a paso</Typography>

          <MathText content={exercise.problemInput} className={styles.exercise} />
        </div>
      </div>
    </Card>
  );
}
