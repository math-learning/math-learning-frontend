import React, { Component } from 'react';
import Derivative from '../Derivative';
import styles from './DerivativePage.css';

class DerivativePage extends Component {
  render() {
    const { inputProblem, problemIndex, result } = this.props;

    return (
      <div className="derivative-page">
        <header id="header" className="App-header">
          <h1>Resuelva paso a paso la siguiente derivada</h1>
        </header>
        <div id="derivative-problem" className="App-content">
          <Derivative problemInput={inputProblem} problemIndex={problemIndex} result={result} />
        </div>
      </div>

    );
  }
}

export default DerivativePage;
