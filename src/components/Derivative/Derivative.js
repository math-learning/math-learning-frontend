import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CheckIcon from "../Icons/CheckIcon"; // TODO: IMPORTS RELATIVOS
import WrongIcon from "../Icons/WrongIcon";
import MathText from "../MathText";
import MathTextBox from '../MathTextBox';
import ProgressBar from '../ProgressBar'

import styles from './Derivative.css';

class Derivative extends Component {

  handleContentChange(value) {
    this.props.onContentChange({ content: value });
  }

  handleValidateStep = () => {
    const { stepList, problemInput, currentExpression } = this.props;

    const lastExpression = stepList.length === 0 ?
      this.props.problemInput :
      stepList[stepList.length - 1];

    this.props.onValidateStep({ stepList, problemInput, lastExpression, currentExpression });
  }

  render() {  
    const { className } = this.props;
    const { isValidInput, currentExpression } = this.props;

    return (
      <div id="derivative-container" className={classNames(styles.container, className)} >
        <ProgressBar />
        <MathText content={this.props.problemInput} />

        <div id="exercise-steps">
          {this.props.stepList.map((step, index) => (
            <div id={`right-step-${index}`} key={`right-step-${index}`} className={styles.rightStep}>
              <span className={styles.item}>  = </span>
              <div className={styles.MathBox}>
                <MathText content={step} />
              </div>
              <CheckIcon className={styles.item} />
            </div>
          ))}

          <div id="current-step" className={styles.currentStep}>
            <span className={styles.item}> = </span>
            <div id="current-content" className={styles.MathBox}>
              <MathTextBox
                content={this.props.currentExpression}
                onContentChange={(value) => this.handleContentChange(value)}
                onEnter={this.handleValidateStep}
              />
            </div>
            {!isValidInput ? (
              <WrongIcon className={styles.item} />
            ) : ''}

            <div id="validate-step" className={styles.item}>
              <button onClick={this.handleValidateStep} disabled={currentExpression === ''}> + </button>
            </div>
          </div>
        </div>
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
  onContentChange: PropTypes.func
};

export default Derivative;
