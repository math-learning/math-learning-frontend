import React, { Component } from 'react';
import Derivative from "./components/Derivative";
import './App.css';

const initialProblem = "\\frac{d(x + x)}{dx}";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id="app">
        <header id="header" className="App-header">
          <h1>Math Learning</h1>
          <h2>Calcule paso a paso la siguiente derivada</h2>
        </header>

        <div id="derivative-problem" className="App-content">
          <Derivative problemInput={initialProblem} />
        </div>
      </div>
    );
  }
}

export default App;
