import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import Main from './components/Main';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import DerivativePage from './components/DerivativePage';
import ExercisesPage from './components/ExercisesPage';
import AddExercisePage from './components/AddExercisePage';
import ProgressBar from './components/ProgressBar';
import SnackbarWrapper from './components/SnackbarWrapper';
import 'typeface-roboto';
import ProfilePage from './components/ProfilePage/ProfilePage';
import CoursesPage from './components/CoursesPage/CoursesPage';
import StatisticsPage from './components/StatisticsPage/StatisticsPage';
import EmptyCoursesPage from './components/CoursesPage/EmptyCoursesPage';
import SearchCourses from './components/CoursesPage/SearchCourses';

const useStyles = makeStyles(() => ({
  mainContent: {
    // paddingTop: theme.spacing(8),
    // paddingBottom: theme.spacing(8),
    flexGrow: 1,
  },
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

}));

const renderDerivativePage = ({ match }) => {
  const { index } = match.params;
  return (
    <DerivativePage problemIndex={index} />
  );
};

const renderExercisesPage = () => (
  <ExercisesPage />
);

const renderAddExercisePage = () => (
  <AddExercisePage />
);
const renderProfilePage = () => (
  <ProfilePage />
);
const renderCoursesPage = () => (
  <CoursesPage />
);

const renderStatisticsPage = () => (
  <StatisticsPage />
);

const renderMainPage = () => (
  <Main />
);

const renderSearchCoursesPage = () => (
  <SearchCourses />
);

export default function App() {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Router>
        <NavBar />

        <Route exact path="/principal" render={renderMainPage} />
        <Route exact path="/exercises" render={renderExercisesPage} />
        <Route exact path="/" render={renderCoursesPage} />
        <Route exact path="/search-courses" render={renderSearchCoursesPage} />
        <Route exact path="/derivative/:index" render={renderDerivativePage} />
        <Route exact path="/add-exercise" render={renderAddExercisePage} />
        <Route exact path="/profile" render={renderProfilePage} />
        <Route exact path="/courses" render={renderCoursesPage} />
        <Route exact path="/statistics" render={renderStatisticsPage} />

        <Footer className={classes.footer} />

        {/* UTILS */}
        <SnackbarWrapper />
        <ProgressBar />

      </Router>
    </main>
  );
}
