import React, { Component } from 'react';
import DerivativePage from "./components/DerivativePage";
import './App.css';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ExercisesPage from './components/ExercisesPage'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Footer from './components/Footer'
import AddExercisePage from './components/AddExercisePage';

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
  <ExercisesPage/>
)

const renderAddExercisePage = () => (
  <AddExercisePage/>
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
