import React, { Component } from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import HelpToolTip from '../HelpTooltip';
import WrongIcon from '../../../common/components/Icons/WrongIcon';
import MathText from '../../../common/math/MathText';
import VariableTextBox from '../../../common/math/VariableTextBox';
import CheckIcon from '../../../common/components/Icons/CheckIcon';
import LeftPanel from '../../../common/containers/LeftPanel/LeftPanel';
import LeftPanelLink from '../../../common/containers/LeftPanel/LeftPanelLink';

import styles from './ExerciseByStepsInterface.module.sass';
import MathTable from '../MathTable';

class ExerciseByStepsInterface extends Component {
  constructor(props) {
    super(props);

    this.state = { latexModeOn: false }; // eslint-disable-line react/no-unused-state
  }

  getCurrentStep = () => {
    // to be implemented
  }

  handleClickSymbol = () => {
    // to be implemented
  }

  handleOnChangeMode = (mode) => {
    const { latexModeOn } = mode;

    this.setState({ latexModeOn }); // eslint-disable-line react/no-unused-state
  }

  handleDeliverExercise = () => {
    const { onDeliverExercise } = this.props;

    onDeliverExercise();
  }

  handleDeleteStep = () => {
    const { exercise, onDeleteStep } = this.props;

    onDeleteStep(exercise);
  }

  getStepList = () => {
    const { exercise: { stepList }, isDelivered } = this.props;

    return (
      (stepList).map((step, index) => {
        const isLastStep = index === stepList.length - 1 && !isDelivered;

        return (
          <div key={`right-step-${index}`} className={styles.rightStep}>
            <span className={styles.item}> = </span>
            <div className={styles.pepe}>
              <MathText
                id={`step-${index}`}
                content={step.expression}
                className={styles.mathText}
              />
              {(step.variables).map((variable, varIndx) => (
                <VariableTextBox
                  id={`variable-math-box-${index}-${varIndx}`}
                  variable={variable}
                  readOnly
                />
              ))}
            </div>
            <div className={classNames(styles.stepActions, !isLastStep && styles.stepWithoutDelete)}>
              <CheckIcon size="20px" className={styles.item} />
              {isLastStep ? (
                <DeleteIcon
                  id="delete-step"
                  className={classNames(styles.item, styles.deleteStep)}
                  onClick={this.handleDeleteStep}
                />
              ) : null}
            </div>
          </div>
        );
      })
    );
  }

  getCurrentStepState = () => {
    const { isProcessing, isInvalid } = this.props;

    if (isProcessing) {
      return <CircularProgress size="25px" className={styles.item} disableShrink />;
    }
    if (isInvalid) {
      return <WrongIcon size="25px" className={styles.item} />;
    }

    return null;
  }

  getHint = () => {
    const { exercise: { initialHint, hints = [], stepList } } = this.props;

    if (hints.length) {
      let hintToShow = 'Prueba utilizando: ';
      hints.forEach((h) => {
        hintToShow = `${hintToShow}\n - ${h.title}`;
      });
      return <HelpToolTip className={styles.help} help={hintToShow} />;
    }

    if (!stepList.length && initialHint) {
      return <HelpToolTip className={styles.help} help={initialHint} />;
    }

    return null;
  }

  render() {
    const {
      exercise, isResolved, isDelivered, onReturnToCourse
    } = this.props;

    const shouldStopEditing = isResolved || isDelivered;

    return (
      <div className={styles.exercise}>
        <LeftPanel>
          <LeftPanelLink text="Volver al curso" includeBack onClick={onReturnToCourse} />

          {!shouldStopEditing && (
            <MathTable
              onClickSymbol={this.handleClickSymbol}
              onChangeMode={this.handleOnChangeMode}
            />
          )}
        </LeftPanel>

        <div className={styles.exercisePerimeter}>
          <div className={styles.container}>
            <Typography variant="h5" className={styles.exerciseName}>
              {exercise.name}
            </Typography>
            <Typography variant="body2" className={styles.exerciseDescription}>
              {exercise.description}
            </Typography>
            <MathText
              id="problem-input"
              className={styles.problemInput}
              content={exercise.problemInput}
            />
            <div className={styles.content}>
              {this.getStepList()}

              {!shouldStopEditing && this.getCurrentStep()}
            </div>
          </div>

          {shouldStopEditing
            ? (
              <div className={styles.solvedExerciseTopContainer}>
                <div className={styles.solvedExerciseContainer}>
                  <Typography
                    id="exercise-resolved"
                    className={styles.solvedExerciseText}
                    variant="h5"
                  >
                    {isDelivered ? 'Ejercicio entregado:' : 'Ejercicio resuelto:'}
                  </Typography>
                  <MathText
                    id="problem-resolved"
                    className={styles.solvedExerciseResult}
                    content={exercise.stepList[exercise.stepList.length - 1].expression}
                  />
                </div>
                {!isDelivered ? (
                  <Button id="deliver-exercise" onClick={this.handleDeliverExercise} className={styles.deliverExerciseButton} variant="outlined">
                    Entregar ejercicio
                  </Button>
                ) : null }
              </div>
            )
            : null}
        </div>
      </div>
    );
  }
}

ExerciseByStepsInterface.propTypes = {
  isResolved: PropTypes.bool,
  isProcessing: PropTypes.bool,
  isInvalid: PropTypes.bool,
  isDelivered: PropTypes.bool
};

export default ExerciseByStepsInterface;
