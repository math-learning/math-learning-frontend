import React, { Component } from 'react';
import Derivative from "./components/Derivative";
import './App.css';
import {cleanLatex} from './utils/latexUtils';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ExercisesPage from './components/ExercisesPage'

const initialProblem = "\\frac{d\\left(e^x.\\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}";

const problems = [
  "\\frac{d\\left(e^x.\\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}"
]

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
          <h1>Ejercicios de derivadas</h1>
          <h2>Por favor seleccione el ejercicio que desea resolver</h2>
        </header>
        <ExercisesPage></ExercisesPage>

        {/* <div id="derivative-problem" className="App-content">
          <Derivative problemInput={cleanLatex(initialProblem)} />
        </div> */}
      </div>
    );
  }
}


export default App;
