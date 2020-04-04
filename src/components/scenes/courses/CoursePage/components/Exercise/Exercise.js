import React from 'react';
import classNames from 'classnames';
import { Card, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MathText from '../../../../../common/math/MathText';
import styles from './Exercise.module.sass';
import MoreVertOptions from '../Options';

const typeMap = {
  derivative: {
    text: 'Derivada'
  },
  integral: {
    text: 'Integral'
  }
};

const difficultyMap = {
  easy: {
    text: 'Fácil',
    className: styles.tcGreen
  },
  medium: {
    text: 'Medio',
    className: styles.tcYellow
  },
  hard: {
    text: 'Difícil',
    className: styles.tcRed
  },
};

const stateMap = {
  incompleted: {
    text: 'En progreso'
  },
  resolved: {
    text: 'Resuelto'
  },
  delivered: {
    text: 'Entregado'
  },
};

export default function Exercise(props) {
  const {
    exercise, onDeleteExercise, onEditExercise, onClickExercise, isProfessor
  } = props;

  return (
    <Card onClick={onClickExercise} className={styles.card}>
      <Grid container>
        <Grid item xs={isProfessor ? 3 : 4}>
          <Typography className={classNames(styles.item, styles.tcGray1)} variant="h6">
            {exercise.name}
          </Typography>
          <Typography className={classNames(styles.item, styles.problemInputTitle)}>Enunciado: Resuelva paso a paso</Typography>
        </Grid>

        <Grid item xs={6}>
          <MathText content={exercise.problemInput} className={styles.exercise} />
        </Grid>

        <Grid item xs={2}>
          <Typography className={styles.type}>
            Tipo: {typeMap[exercise.type].text}
          </Typography>
          <Typography className={styles.type}>
            Estado: {stateMap[exercise.state].text}
          </Typography>
          <Typography className={difficultyMap[exercise.difficulty].className}>
            Dificultad: {difficultyMap[exercise.difficulty].text}
          </Typography>
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
