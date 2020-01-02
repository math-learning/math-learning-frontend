import React from 'react';
import { Card, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MathText from '../../../../../MathText/MathText.container';
import styles from './ExerciseManagement.module.sass';
import MoreVertOptions from '../Options';

export default function ExerciseManagement(props) {
  const {
    exercise, onDeleteExercise, onEditExercise,
  } = props;
  return (
    <Card className={styles.card}>
      <div className={styles.displayLine}>
        <div className={styles.fullWidth}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Typography className={styles.tcGray1}>
                  Nombre:
                {exercise.name}
              </Typography>
              <Typography className={styles.tcGray1}>
                  Dificultad:
                {exercise.difficulty}
              </Typography>
              <Typography className={styles.tcGray1}>
                  Tipo:
                {exercise.type}
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography className={styles.tcGray1}>Enunciado: Resuelva paso a paso</Typography>
              <span>
                <MathText content={exercise.exercise} className={styles.exercise} />
              </span>

            </Grid>

          </Grid>
        </div>

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
    </Card>
  );
}
