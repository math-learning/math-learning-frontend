import React, { Component } from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import HelpToolTip from '../HelpTooltip';
import WrongIcon from '../../../Icons/WrongIcon';
import MathText from '../../../MathText';
import MathTextBox from '../../../MathTextBox';
import CheckIcon from '../../../Icons/CheckIcon';

import styles from './Derivative.module.sass';

const HELP_TEST = 'derivada de la suma'; // TODO: IMPLEMENT IT

class Derivative extends Component {
  handleValidateStep = () => {
    const { exercise, currentExpression, onValidateStep } = this.props;

    if (currentExpression) {
      onValidateStep({ exercise, currentExpression });
    }
  }

  handleContentChange = (value) => {
    const { onContentChange } = this.props;

    onContentChange(value);
  }

  handleDeleteStep = () => {
    const { exercise, onDeleteStep } = this.props;

    onDeleteStep(exercise);
  }

  getStepList = () => {
    const { exercise: { stepList } } = this.props;

    return (
      (stepList).map((step, index) => (
        <div key={`right-step-${index}`} className={styles.rightStep}>
          <span className={styles.item}> = </span>
          <MathText
            id={`step-${index}`}
            content={step}
            className={styles.mathText}
          />
          <CheckIcon size="20px" className={styles.item} />
          {index === stepList.length - 1 ? ( // the last step
            <DeleteIcon
              id="delete-step"
              className={classNames(styles.item, styles.deleteStep)}
              onClick={this.handleDeleteStep}
            />
          ) : null}
        </div>
      ))
    );
  }

  getCurrentStepState = () => {
    const { exerciseStatus } = this.props;

    if (exerciseStatus === 'processing') {
      return <CircularProgress size="25px" className={styles.item} disableShrink />;
    }
    if (exerciseStatus === 'invalid') {
      return <WrongIcon size="25px" className={styles.item} />;
    }

    return null;
  }

  getCurrentStep = () => {
    const { currentExpression } = this.props;

    return (
      <div className={styles.step}>
        <HelpToolTip className={styles.help} help={HELP_TEST} />

        <div className={styles.stepContent}>
          <span className={styles.item}> = </span>
          <MathTextBox
            id="current-step"
            content={currentExpression}
            className={styles.mathBox}
            onContentChange={this.handleContentChange}
            onEnter={this.handleValidateStep}
          />
          {this.getCurrentStepState()}
          <Button
            id="validate-step"
            className={styles.item}
            onClick={this.handleValidateStep}
            disabled={!currentExpression}
            variant="contained"
            color="primary"
          >
            Validar
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { exercise, isResolved } = this.props;

    return (
      <React.Fragment>
        <div className={styles.container}>
          <MathText
            id="problem-input"
            className={styles.problemInput}
            content={exercise.problemInput}
          />
          <div className={styles.content}>
            {this.getStepList()}

            {!isResolved
              ? this.getCurrentStep()
              : null}
          </div>
        </div>

        {isResolved
          ? (
            <React.Fragment>
              <Typography
                id="exercise-resolved"
                className={styles.solvedExerciseText}
                variant="h4"
              >
                Ejercicio resuelto!
              </Typography>

              <MathText
                id="problem-resolved"
                content={exercise.stepList[exercise.stepList.length - 1]}
              />
            </React.Fragment>
          )
          : null}
      </React.Fragment>
    );
  }
}

Derivative.propTypes = {
  isResolved: PropTypes.bool,
  currentExpression: PropTypes.string,
  onValidateStep: PropTypes.func,
  onContentChange: PropTypes.func,
};

export default Derivative;
