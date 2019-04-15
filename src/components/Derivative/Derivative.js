import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import MathText from "../MathText/MathText"; // TODO: IMPORTS RELATIVOS
import MathTextBox from '../MathTextBox/MathTextBox';
import mathClient from '../../clients/mathClient';

import './Derivative.css';

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
    if (stepList.length == 0) {
      return this.state.problemInput;
    } else {
      return stepList[stepList.length - 1];
    }
  }

  validateNotInHistory = (currentExpression) => {
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
    const { isValidInput } = this.state;

    return (
      <div id="derivative-exercise" className={classNames("Der-container", className)} >
        <MathText content={this.state.problemInput} />

        <div id="exercise-steps">
          {this.state.stepList.map((step, index) => (
            <div id={`right-step-${index}`} key={`right-step-${index}`} className="Der-right-step">
              <span className="Der-item">  = </span>
              <div className="Der-MathBox">
                <MathText content={step} />
              </div>
              <span className={classNames("Der-item", "Der-right-item")}>  Bien! </span>
            </div>
          ))}

          <div id="current-step" className="Der-current-step">
            <span className="Der-item" onClick={this.showTheorems}> = </span>
            <div id="current-content" className="Der-MathBox">
              <MathTextBox
                content={this.state.currentExpression}
                onContentChange={(value) => this.handleContentChange(value)}
                onEnter={this.validateStep}
              />
            </div>
            {!isValidInput ? (<span  className={classNames("Der-item", "Der-wrong-item")}> Mal! </span> ) : ''}

            <div className="Der-item" >
              <button onClick={this.validateStep}> + </button>
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
