import React, { Component } from 'react';
import DerivativePage from "./components/DerivativePage";
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ExercisesPage from './components/ExercisesPage'
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Footer from './components/Footer'
import AddExercisePage from './components/AddExercisePage';
import ProgressBar from './components/ProgressBar';
import SnackbarWrapper from './components/SnackbarWrapper';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box, Container } from '@material-ui/core';




const useStyles = makeStyles(theme => ({
  mainContent: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    flexGrow: 1
  },
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  
  
}));

const renderDerivativePage = ({ match }) => {
  console.log(match)
  const index = match.params.index
  return (
    <DerivativePage problemIndex={index} />
  )
}

const renderExercisesPage = () => (
  <ExercisesPage />
)

const renderAddExercisePage = () => (
  <AddExercisePage />
)

export default function App() {
  
  const classes = useStyles();

  return (
        <main className={classes.root}>
          <Router>
            <NavBar />
            
            <Container className={classes.mainContent} maxWidth="md" >            
              <Route exact path="/" render={renderExercisesPage} />
              <Route exact path="/derivative/:index" render={renderDerivativePage} />
              <Route exact path="/add-exercise" render={renderAddExercisePage} />
            </Container>
            
            <Footer className={classes.footer}/>

            {/* UTILS */}
            <SnackbarWrapper />
            <ProgressBar />

          </Router>
        </main>
      
    
  );

}
