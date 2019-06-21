import React, { Component } from 'react';
import Derivative from "./components/Derivative";
import './App.css';
import {cleanLatex} from './utils/latexUtils';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar'

const initialProblem = "\\frac{d\\left(e^x.\\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id="app">
        <NavBar/>
        <header id="header" className="App-header">
          <h1>Math Learning</h1>
          <h2>Calcule paso a paso la siguiente derivada</h2>
        </header>

        <div id="derivative-problem" className="App-content">
          <Derivative problemInput={cleanLatex(initialProblem)} />
        </div>
      </div>
    );
  }
}


export default App;
