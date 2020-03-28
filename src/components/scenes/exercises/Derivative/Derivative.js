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
import LeftPanel from '../../../common/containers/LeftPanel/LeftPanel';
import LeftPanelLink from '../../../common/containers/LeftPanel/LeftPanelLink';
import styles from './Derivative.module.sass';
import MathTable from '../MathTable';

const HELP_TEST = 'Intenta con esto: derivada de la suma';

class Derivative extends Component {
  constructor(props) {
    super(props);

    this.MathBoxRef = React.createRef();
    this.state = {
      latexModeOn: false
    };
  }

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

  handleClickSymbol = (symbol) => {
    if (!this.MathBoxRef.current) {
      return;
    }

    if (this.MathBoxRef.current.mathQuillEl) {
      if (!symbol.value) {
        this.MathBoxRef.current.mathQuillEl.write(symbol.latexValue);
      } else {
        this.MathBoxRef.current.mathQuillEl.typedText(symbol.value);
      }
      this.MathBoxRef.current.mathQuillEl.focus();
    }

    if (this.MathBoxRef.current.latexEl) {
      const valueToInsert = symbol.latexValue || symbol.value;
      const newContent = this.insertAtCursorPosition(valueToInsert, this.MathBoxRef.current.latexEl);

      this.handleContentChange(newContent);
    }
  }

  insertAtCursorPosition = (valueToInsert, ref) => {
    const cursorPosition = ref.selectionStart;
    const currentValue = ref.value;
    const newContent = currentValue.slice(0, cursorPosition) + valueToInsert + currentValue.slice(cursorPosition);

    ref.value = newContent; // eslint-disable-line
    ref.focus();
    ref.selectionStart = cursorPosition + valueToInsert.length; // eslint-disable-line

    return newContent;
  }

  handleOnChangeMode = (mode) => {
    const { latexModeOn } = mode;

    this.setState({ latexModeOn });
  }

  handleDeliverExercise = () => {
    const { onDeliverExercise } = this.props;

    onDeliverExercise();
  }

  getStepList = () => {
    const { exercise: { stepList }, isDelivered } = this.props;

    return (
      (stepList).map((step, index) => {
        const isLastStep = index === stepList.length - 1 && !isDelivered;

        return (
          <div key={`right-step-${index}`} className={styles.rightStep}>
            <span className={styles.item}> = </span>
            <MathText
              id={`step-${index}`}
              content={step}
              className={styles.mathText}
            />
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

  getCurrentStep = () => {
    const { latexModeOn } = this.state;
    const { currentExpression, isProcessing } = this.props;

    return (
      <div className={styles.step}>
        <HelpToolTip className={styles.help} help={HELP_TEST} />

        <div className={styles.stepContent}>
          <span className={styles.item}> = </span>
          <MathTextBox
            ref={this.MathBoxRef}
            latexMode={latexModeOn}
            content={currentExpression}
            className={styles.mathBox}
            onContentChange={this.handleContentChange}
            onEnter={this.handleValidateStep}
          />
          {this.getCurrentStepState()}
          <Button
            id="validate-step"
            className={styles.validateButton}
            onClick={this.handleValidateStep}
            disabled={!currentExpression || isProcessing}
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
    const {
      exercise, isResolved, isDelivered, onReturnToCourse
    } = this.props;

    // TODO: AGREGAR DISPLAY-IF
    return (
      <div className={styles.exercise}>
        <LeftPanel>
          <LeftPanelLink text="Volver al curso" includeBack onClick={onReturnToCourse} />

          {!isDelivered && (
            <MathTable
              onClickSymbol={this.handleClickSymbol}
              onChangeMode={this.handleOnChangeMode}
            />
          )}
        </LeftPanel>

        <div className={styles.exercisePerimeter}>
          <div className={styles.container}>
            <MathText
              id="problem-input"
              className={styles.problemInput}
              content={exercise.problemInput}
            />
            <div className={styles.content}>
              {this.getStepList()}

              {!(isResolved || isDelivered)
                ? this.getCurrentStep()
                : null}
            </div>
          </div>

          {isResolved || isDelivered
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
                    content={exercise.stepList[exercise.stepList.length - 1]}
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

Derivative.propTypes = {
  isResolved: PropTypes.bool,
  currentExpression: PropTypes.string,
  onValidateStep: PropTypes.func,
  onContentChange: PropTypes.func,
};

export default Derivative;
