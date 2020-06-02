import React, { Component } from 'react';
import { Button, CircularProgress, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import HelpToolTip from '../HelpTooltip';
import WrongIcon from '../../../common/components/Icons/WrongIcon';
import MathText from '../../../common/math/MathText';
import MathTextBox from '../../../common/math/MathTextBox/MathTextBoxComplete';
import CheckIcon from '../../../common/components/Icons/CheckIcon';
import LeftPanel from '../../../common/containers/LeftPanel/LeftPanel';
import LeftPanelLink from '../../../common/containers/LeftPanel/LeftPanelLink';
import styles from './Integrate.module.sass';
import MathTable from '../MathTable';
import VariableTextBox from '../../../common/math/MathTextBox/VariableTextBox';

class Integrate extends Component {
  constructor(props) {
    super(props);

    this.MathBoxRef = React.createRef();
    this.state = {
      latexModeOn: false
    };
  }

  handleValidateStep = () => {
    const { currentExpression, onValidateStep } = this.props;

    if (currentExpression) {
      onValidateStep(currentExpression);
    }
  }

  handleCurrentExpressionChange = (currentExpression) => {
    const { onContentChange } = this.props;

    onContentChange(currentExpression);
  }

  handleDeleteStep = () => {
    const { exercise, onDeleteStep } = this.props;

    onDeleteStep(exercise);
  }

  handleClickSymbol = (symbol) => { // TODO: algo hay que hacer con esto. Quizás pueda estar directamente metido en MathTextBox como funcion?
    if (!this.MathBoxRef.current) {
      return;
    }

    this.MathBoxRef.current.insertateAMEO(symbol);
  }

  handleOnChangeMode = (mode) => {
    const { latexModeOn } = mode;

    this.setState({ latexModeOn });
  }

  handleDeliverExercise = () => { // TODO: generic
    const { onDeliverExercise } = this.props;

    onDeliverExercise();
  }

  getStepList = () => { // TODO: totally generic
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
                content={step.expression} // TODO: ver si directamente sepa interpretar el objeto
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

  getCurrentStepState = () => { // TODO: generic
    const { isProcessing, isInvalid } = this.props;

    if (isProcessing) {
      return <CircularProgress size="25px" className={styles.item} disableShrink />;
    }
    if (isInvalid) {
      return <WrongIcon size="25px" className={styles.item} />;
    }

    return null;
  }

  getHint = () => { // TODO: generic
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

  getCurrentStep = () => { // TODO: particular
    const { latexModeOn } = this.state;
    const { currentExpression, isProcessing } = this.props;

    return (
      <div className={styles.step}>
        {this.getHint()}

        <div className={styles.stepContent}>
          <span className={styles.item}> = </span>
          <MathTextBox
            ref={this.MathBoxRef}
            latexMode={latexModeOn}
            content={currentExpression}
            className={styles.mathBox}
            onContentChange={this.handleCurrentExpressionChange}
            onEnter={this.handleValidateStep}
          />
          {this.getCurrentStepState()}
          <Button
            id="validate-step"
            className={styles.validateButton}
            onClick={this.handleValidateStep}
            disabled={!currentExpression.expression || isProcessing}
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

              {!(isResolved || isDelivered) && this.getCurrentStep()}
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

Integrate.propTypes = {
  isResolved: PropTypes.bool,
  currentExpression: PropTypes.object,
  onValidateStep: PropTypes.func,
  onContentChange: PropTypes.func,
};

export default Integrate;
