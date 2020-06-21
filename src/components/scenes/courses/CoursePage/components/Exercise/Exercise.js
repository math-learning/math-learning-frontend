import React, { Component } from 'react';
import classNames from 'classnames';
import { Card, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import WrongGenerationIcon from '@material-ui/icons/BatteryAlert';
import WaitingGeneratedIcon from '@material-ui/icons/BatteryCharging60';
import constants from '../../../../../../utils/constants';
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

  componentDidMount() {
    const { exercise, onCheckExerciseStatus } = this.props;

    if (exercise.pipelineStatus === constants.WAITING_PIPELINE_STATUS) {
      onCheckExerciseStatus();
    }
  }

  handleClickExercise = () => {
    const { exercise, onClickExercise } = this.props;

    if ([
      constants.WAITING_PIPELINE_STATUS,
      constants.FAILED_PIPELINE_STATUS
    ].includes(exercise.pipelineStatus)) {
      this.setState({ isTooltipOpen: true });
      this.handleOnOpenTooltip();
      return;
    }
    onClickExercise();
  }

  handleOnOpenTooltip = () => {
    setTimeout(() => this.setState({ isTooltipOpen: false }), 3000);
  }

  renderTooltip = () => {
    const { isTooltipOpen } = this.state;
    const { exercise } = this.props;

    if (exercise.pipelineStatus === constants.GENERATED_PIPELINE_STATUS) {
      return null;
    }
    const message = exercise.pipelineStatus === constants.WAITING_PIPELINE_STATUS
      ? 'El ejercicio aún no se ha generado. Vuelve en uno rato'
      : 'El ejercicio ha fallado su generación. Vuelve a crearlo';

    const icon = exercise.pipelineStatus === constants.WAITING_PIPELINE_STATUS
      ? <WaitingGeneratedIcon className={styles.statusIcon} />
      : <WrongGenerationIcon className={styles.statusIcon} />;

    return (
      <BootstrapTooltip
        open={isTooltipOpen}
        title={message}
        placement="bottom-start"
      >
        {icon}
      </BootstrapTooltip>
    );
  }

  render() {
    const { exercise, onDeleteExercise, onEditExercise, isProfessor } = this.props;

    return (
      <Card onClick={this.handleClickExercise} className={styles.card}>
        <Grid container>
          <Grid item xs={isProfessor ? 3 : 4}>
            <Typography className={classNames(styles.item, styles.tcGray1)} variant="h6">
              {exercise.name}
            </Typography>
            <Typography className={classNames(styles.item, styles.problemInputTitle)}>Enunciado: Resuelva paso a paso</Typography>
            {this.renderTooltip()}
          </Grid>

          <Grid item xs={6}>
            <MathText content={exercise.problemInput} className={styles.exercise} />
          </Grid>

          <Grid item xs={2}>
            <Typography className={classNames(styles.type, styles.exerciseInfo)}>
              Tipo: {typeMap[exercise.type].text}
            </Typography>
            <Typography className={classNames(styles.type, styles.exerciseInfo)}>
              Estado: {stateMap[exercise.state].text}
            </Typography>
            <Typography className={classNames(difficultyMap[exercise.difficulty].className, styles.exerciseInfo)}>
              Dificultad: {difficultyMap[exercise.difficulty].text}
            </Typography>
            {exercise.calification && (
              <Typography className={styles.qualification}>
                Calificación: {exercise.calification}
              </Typography>
            )}
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
