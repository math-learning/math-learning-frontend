import React, { Component } from 'react';
import classNames from 'classnames';
import { Card, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import WaitingGeneratedIcon from '@material-ui/icons/BatteryCharging60';
// import AlreadyGeneratedIcon from '@material-ui/icons/BatteryChargingFull';
import MathText from '../../../../../common/math/MathText';
import BootstrapTooltip from '../../../../../../bootstrap/Tooltip';
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

export default class Exercise extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipOpen: false
    };
  }

  handleClickExercise = () => {
    const { exercise, onClickExercise } = this.props;

    if (exercise.pipelineStatus === 'waiting') {
      this.setState({ isTooltipOpen: true });
      this.handleOnOpenTooltip();
      return;
    }
    onClickExercise();
  }

  handleOnOpenTooltip = () => {
    setTimeout(() => this.setState({ isTooltipOpen: false }), 3000);
  }

  render() {
    const { isTooltipOpen } = this.state;
    const { exercise, onDeleteExercise, onEditExercise, isProfessor } = this.props;

    return (
      <Card onClick={this.handleClickExercise} className={styles.card}>
        <Grid container>
          <Grid item xs={isProfessor ? 3 : 4}>
            <Typography className={classNames(styles.item, styles.tcGray1)} variant="h6">
              {exercise.name}
            </Typography>
            <Typography className={classNames(styles.item, styles.problemInputTitle)}>Enunciado: Resuelva paso a paso</Typography>
            {exercise.pipelineStatus === 'waiting' && (
              <BootstrapTooltip
                open={isTooltipOpen}
                title="El ejercicio aún no se ha generado. Vuelve en unos minutos"
                placement="bottom-start"
              >
                <WaitingGeneratedIcon className={styles.statusIcon} />
              </BootstrapTooltip>
            )}
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
                      exercise
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
}
