import React from 'react';
import DerivativePage from "./components/DerivativePage";
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExercisesPage from './components/ExercisesPage'
import { makeStyles } from '@material-ui/core/styles';

import Footer from './components/Footer'
import AddExercisePage from './components/AddExercisePage';
import ProgressBar from './components/ProgressBar';
import SnackbarWrapper from './components/SnackbarWrapper';
import 'typeface-roboto';
import { Container } from '@material-ui/core';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { CoursesPage } from './components/CoursesPage/CoursesPage';
import { StatisticsPage } from './components/StatisticsPage/StatisticsPage';

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
const renderProfilePage = () => (
  <ProfilePage />
)
const renderCoursesPage = () => (
  <CoursesPage />
)

const renderStatisticsPage = () => (
  <StatisticsPage />
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
              <Route exact path="/profile" render={renderProfilePage} />
              <Route exact path="/courses" render={renderCoursesPage} />
              <Route exact path="/statistics" render={renderStatisticsPage} />
            </Container>
            
            <Footer className={classes.footer}/>

            {/* UTILS */}
            <SnackbarWrapper />
            <ProgressBar />

          </Router>
        </main>
      
    
  );

}
