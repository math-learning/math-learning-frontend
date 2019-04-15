import React, { Component } from 'react';
import Derivative from "./components/Derivative/Derivative";

import './App.css';

const initialProblem = "Derivative(x + x ,x)";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1>Math Learning</h1>
          <h2>Calcule paso a paso la siguiente derivada</h2>
        </header>

        <div className="App-content">
          <Derivative problemInput={initialProblem} />
        </div>
      </div>
    );
  }
}


export default App;
