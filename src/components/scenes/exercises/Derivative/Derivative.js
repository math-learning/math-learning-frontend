import React, { Component } from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import WrongIcon from '../../../Icons/WrongIcon';
import MathText from '../../../MathText';
import MathTextBox from '../../../MathTextBox';
import CheckIcon from '../../../Icons/CheckIcon';

import styles from './Derivative.module.sass';

class Derivative extends Component {
  handleValidateStep = () => {
    const { currentExpression } = this.props;
    const { stepList, problemInput, onValidateStep } = this.props;

    const lastExpression = stepList.length === 0
      ? problemInput
      : stepList[stepList.length - 1];

    onValidateStep({
      stepList, problemInput, lastExpression, currentExpression
    });
  }

  handleContentChange = (value) => {
    const { onContentChange } = this.props;

    onContentChange(value);
  }

  getStepList = () => {
    const { stepList } = this.props;

    return (
      (stepList).map((step, index) => (
        <div key={`right-step-${index}`} className={styles.rightStep}>
          <span className={styles.item}> = </span>
          <MathText
            content={step}
            className={styles.mathText}
          />
          <CheckIcon size="20px" className={styles.item} />
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
        <span className={styles.item}> = </span>
        <MathTextBox
          content={currentExpression}
          className={styles.mathBox}
          onContentChange={this.handleContentChange}
          onEnter={this.handleValidateStep}
        />
        {this.getCurrentStepState()}
        <Button
          className={styles.item}
          onClick={this.handleValidateStep}
          disabled={!currentExpression}
          variant="contained"
          color="primary"
        >
          Validar
        </Button>
      </div>
    );
  }

  render() {
    const { exercise, isResolved } = this.props;

    return (
      <div>
        <div className={styles.container}>
          <MathText
            className={styles.problemInput}
            content={exercise.exercise}
          />
          <div className={styles.content}>
            {this.getStepList()}

            {!isResolved
              ? this.getCurrentStep()
              : null}
          </div>
        </div>

        {isResolved ? (
          <Typography className={styles.solvedExerciseText} variant="h4">
            Ejercicio resuelto!
          </Typography>)
          : null}
      </div>
    );
  }
}

Derivative.propTypes = {
  stepList: PropTypes.array,
  className: PropTypes.string,
  isValidInput: PropTypes.bool,
  problemInput: PropTypes.string,
  currentExpression: PropTypes.string,
  onValidateStep: PropTypes.func,
  onContentChange: PropTypes.func,
};

export default Derivative;
