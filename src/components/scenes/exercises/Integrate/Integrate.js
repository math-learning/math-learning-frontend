import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import MathTextBoxWithVariables from '../../../common/math/MathTextBoxWithVariables';
import ExerciseByStepsInterface from '../ExerciseByStepsInterface';

import styles from './Integrate.module.sass';

class Integrate extends ExerciseByStepsInterface {
  constructor(props) {
    super(props);

    this.MathBoxRef = React.createRef();
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

  handleClickSymbol = (symbol) => {
    if (!this.MathBoxRef.current) {
      return;
    }

    this.MathBoxRef.current.insertateAMEO(symbol);
  }

  getCurrentStep = () => {
    const { latexModeOn } = this.state;
    const { currentExpression, isProcessing } = this.props;

    return (
      <div className={styles.step}>
        {this.getHint()}

        <div className={styles.stepContent}>
          <span className={styles.item}> = </span>
          <MathTextBoxWithVariables
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
}

Integrate.propTypes = {
  isProcessing: PropTypes.bool,
  currentExpression: PropTypes.object,
  onValidateStep: PropTypes.func,
  onContentChange: PropTypes.func
};

export default Integrate;
