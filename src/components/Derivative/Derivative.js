import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CheckIcon from "../Icons/CheckIcon/CheckIcon"; // TODO: IMPORTS RELATIVOS
import WrongIcon from "../Icons/WrongIcon/WrongIcon";
import MathText from "../MathText/MathText";
import MathTextBox from '../MathTextBox/MathTextBox';
import mathClient from '../../clients/mathClient';

import styles from './Derivative.css';

class Derivative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepList: [],
      isValidInput: true,
      currentExpression: "",
      problemInput: props.problemInput,


      theorems: [{ // TODO: ESTO NO DEBERIA ESTAR ACA
        name: "derivada de la suma",
        left: "Derivative(f(x) + g(x) , x)",
        right: "Derivative(f(x), x) + Derivative(g(x), x)"
      },
      {
        name: "derivada del producto",
        left: "Derivative(f(x) * g(x) , x)",
        right: "Derivative(f(x), x) * g(x) + Derivative(g(x), x) * f(x)"
      },
      {
        name: "derivada de la division",
        left: "Derivative(f(x) / g(x) , x)",
        right: "Derivative(( f(x), x) * g(x) - Derivative(g(x), x) * f(x)) / ( g(x)** 2)"
      }]
    };

    this.handleContentChange = this.handleContentChange.bind(this);
    this.validateStep = this.validateStep.bind(this);
  }


  handleContentChange(value) {
    this.setState({ currentExpression: value, isValidInput: true });
  }

  getLastExpression = () => {
    const stepList = this.state.stepList;
    if (stepList.length === 0) {
      return this.state.problemInput;
    } else {
      return stepList[stepList.length - 1];
    }
  }

  validateNotInHistory = (currentExpression) => { // TODO: ESTA NO DEBERIA ESTAR DIRECTAMENTE. DEBERIA SER UN VALIDATE STEP SOLO
    let expressionHistory = [this.state.problemInput];
    this.state.stepList.forEach(element => {
      expressionHistory.push(element)
    });

    return mathClient.validateNotInHistory(currentExpression, expressionHistory);
  }

  validateStep = async () => {
    const currentExpression = this.state.currentExpression;
    const data = await this.validateNotInHistory(currentExpression);

    if( data ) { // TODO: REMOVER ESTA COMPARACION
      const validationStep = {
        old_expression: this.getLastExpression(),
        new_expression: currentExpression,
        theorems: this.state.theorems
      }
      const validationResponse = await mathClient.validateStep(validationStep); // TODO: ESTO DEBERIA TIRAR UN ERROR, NO CHEQUEAR SI ES NULL

      if (validationResponse) {
        this.setState({
          isValidInput: true,
          currentExpression: "",
          stepList: [...this.state.stepList, currentExpression]
        }); // TODO: ESTO VA EN EL ACTION Y RESOLVER
      } else {
        this.setState({ isValidInput: false })
      }

    } else {
      this.setState({ isValidInput: false })
    }
  }


  render() {  
    const { className } = this.props;
    const { isValidInput, currentExpression } = this.state;

    return (
      <div id="derivative-container" className={classNames(styles.container, className)} >
        <MathText content={this.state.problemInput} />

        <div id="exercise-steps">
          {this.state.stepList.map((step, index) => (
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
                content={this.state.currentExpression}
                onContentChange={(value) => this.handleContentChange(value)}
                onEnter={this.validateStep}
              />
            </div>
            {!isValidInput ? (
              <WrongIcon className={styles.item} />
            ) : ''}

            <div id="validate-step" className={styles.item}>
              <button onClick={this.validateStep} disabled={currentExpression === ''}> + </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Derivative.propTypes = {
  className: PropTypes.string,
  problemInput: PropTypes.string
};

export default Derivative;
