import React, { Component } from 'react';
import DerivativePage from "./components/DerivativePage";
import './App.css';
import { cleanLatex } from './utils/latexUtils';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ExercisesPage from './components/ExercisesPage'

const exercises = [
  {
    input: "\\frac{d\\left(e^x.\\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}",
    result: "\\frac{1}{\\cos ^2\\left(x\\right)}"
  },
  {
    input: "\\frac{d\\left(x^2+x\\ +\\cos \\left(x\\right)\\right)}{dx}",
    result: "e^x\\cdot \\left(1\ +x\\right)+\\cos \\left(x\\right)\\cdot x^2+\\sin \\left(x\\right)\\cdot 2 \\cdot x"
  },
  {
    input:"\\frac{d(\\frac{sen(x)}{\\cos(x)})} {dx}",
    result: "\\frac{1}{\\cos \left(x\\right)^2}"
  },
  {
    input: "\\frac{d\\left(e^x.\\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}",
    result: "e^x \\cdot \\left(x\ +1\\right)\ + 2\\cdot x\\cdot sen\\left(x\\right)+\\cos \\left(x\\right)\\cdot x^2"
  },
  {
    input: "\\frac{d\\left(x^2+x\\ +\\cos \\left(x\\right)\\right)}{dx}",
    result: "2*x+1-sin(x)"
  },
  {
    input: "\\frac{d\\left(e^x\\right)}{dx}",
    result: "e^x"
  }

]

const renderDerivativePage = ({match}) => {
  console.log(match)
  const index = match.params.index
  return (
    <DerivativePage inputProblem={exercises[index].input} problemIndex={index} result={exercises[index].result}/>
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
