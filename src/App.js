import React, { Component } from 'react';
import DerivativePage from "./components/DerivativePage";
import './App.css';
import { cleanLatex } from './utils/latexUtils';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ExercisesPage from './components/ExercisesPage'

const exercises = [
  "\\frac{d\\left(e^x.\\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}",
  "\\frac{d\\left(x^2+x\\ +\\cos \\left(x\\right)\\right)}{dx}",
  "\\frac{d(\\frac{sen(x)}{cos(x)})} {dx}",
  "\\frac{d\\left(e^x.\\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}",
  "\\frac{d\\left(x^2+x\\ +\\cos \\left(x\\right)\\right)}{dx}",

]

const renderDerivativePage = ({match}) => {
  console.log(match)
  const index = match.params.index
  return (
    <DerivativePage inputProblem={exercises[index]} />
  )
}

const renderExercisesPage = () => (
  <ExercisesPage exercises={exercises} />
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div id="app">

        <Router>
          <NavBar />
          <div>
            <Route exact path="/" render={renderExercisesPage} />
            <Route exact path="/derivative/:index" render={renderDerivativePage} />
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
