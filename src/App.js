import React, { Component } from 'react';
import DerivativePage from "./components/DerivativePage";
import './App.css';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ExercisesPage from './components/ExercisesPage'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Footer from './components/Footer'

const exercises = [
  {
    name: "e + sen",
    input: "\\frac{d\\left(e^x \\cdot \\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}",
    result: "e^x\\cdot \\left(1\ +x\\right)+ \\cos \\left(x\\right)\\cdot x^2+\\sin \\left(x\\right)\\cdot 2\\cdot x"
  },
  {
    name: "deriv suma x + x2 + cos",
    input: "\\frac{d\\left(x^2+x\\ +\\cos \\left(x\\right)\\right)}{dx}",
    result: "2*x+1-\\sin(x)"
  },
  {
    name: "sen / cos",
    input:"\\frac{d(\\frac{sen(x)}{\\cos(x)})} {dx}",
    result: "\\frac{1}{\\cos\\left(x\\right)^2}"
  },
  {
    name: "deriv of a constant",
    input: "\\frac{d(\\frac{ \\frac{d(sen(x))}{dx}}{\\cos(x)})} {dx}",
    // TODO:
    result: "0"
  },
  {
    name: "2 derivatives",
    input: " \\frac{d\\left(  \\frac{d\\left(e^x\\right)}{dx} \\right)}{dx}",
    result: "e^x"
  },
  {
    name: " e ",
    input: "\\frac{d\\left(e^x\\right)}{dx}",
    result: "e^x"
  },
  {
    name: "function composition",
    input: "\\frac{d\\left(      \\sin(\\cos(x))         \\right)}{dx}",
    result: "-\\cos (\\cos (x)) \\cdot \\sin(x)"
  },
  {
    name: "multiplication of 3 elem",
    input: "\\frac{d\\left(x^2 \\cdot \\sin(x) \\cdot \\cos \\left(x\\right)\\right)}{dx}",
    //TODO
    result: "\\frac{d\\left(e^3  \\cdot x \\right)}{dx}"
  },
  {
    name: "constant times x",
    input: "\\frac{d\\left(e^3  \\cdot x \\right)}{dx}",
    result: "e^3"
  }

]



const theme = createMuiTheme({
  palette: {
    primary: { main: '#20232a' }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
});



const renderDerivativePage = ({match}) => {
  console.log(match)
  const index = match.params.index
  return (
    <DerivativePage problemIndex={index}/>
  )
}

const renderExercisesPage = () => (
  <ExercisesPage exercises={exercises} />
)

const renderAddExercisePage = () => (
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
<ThemeProvider theme={theme}>
<Router>
          <NavBar />
          <div className="page-content">
            <Route exact path="/" render={renderExercisesPage} />
            <Route exact path="/derivative/:index" render={renderDerivativePage} />
            <Route exact path="/add-exercise" render={renderAddExercisePage} />
          </div>
          <Footer/>
        </Router>
</ThemeProvider>
  
      </div>
    );
  }
}


export default App;
