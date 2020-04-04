import React from 'react';
import Derivative from '../Derivative';

export default function DerivativePage(props) {
  const { inputProblem, problemIndex, result } = props;

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
