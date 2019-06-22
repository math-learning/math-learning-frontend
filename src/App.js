import React, { Component } from 'react';
import DerivativePage from "./components/DerivativePage";
import './App.css';
import { cleanLatex } from './utils/latexUtils';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ExercisesPage from './components/ExercisesPage'

const initialProblem = "\\frac{d\\left(e^x.\\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}";

const exercises = [
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
        
        <Router>
          <NavBar/>  
          <div>
            <Route exact path="/" component={ExercisesPage}/>
            <Route path="/derivative" component={DerivativePage} /> 
          </div>
        </Router>

        {/* <div id="derivative-problem" className="App-content">
          <Derivative problemInput={cleanLatex(initialProblem)} />
        </div> */}
      </div>
    );
  }
}


export default App;
