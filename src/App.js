import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Router } from 'react-router-dom';
import 'typeface-roboto';

import AddExercisePage from './components/AddExercisePage';
import CoursePage from './components/CoursePage';
import OwnCoursesPage from './components/scenes/courses/OwnCoursesPage';
import SearchCourses from './components/CoursesPage/SearchCourses';
import DerivativePage from './components/DerivativePage';
import ExercisesPage from './components/ExercisesPage';
import Footer from './components/Footer';
import Main from './components/Main';
import ModalContainer from './components/Modals/ModalContainer';
import NavBar from './components/NavBar';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProgressBar from './components/ProgressBar';
import SnackbarWrapper from './components/SnackbarWrapper';
import StatisticsPage from './components/StatisticsPage/StatisticsPage';
import history from './store/history';

const useStyles = makeStyles(() => ({
  mainContent: {
    flexGrow: 1,
  },
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }
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

const renderStatisticsPage = () => (
  <StatisticsPage />
);

const renderSearchCoursesPage = () => (
  <SearchCourses />
);

const renderCoursePage = ({ match }) => {
  const { courseId, moduleId } = match.params;
  return (
    <CoursePage courseId={courseId} moduleId={moduleId} />
  );
};

const App = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Router history={history}>
        <NavBar />

        <Route exact path="/" component={Main} />
        <Route exact path="/courses" render={renderSearchCoursesPage} />
        <Route exact path="/exercises" render={renderExercisesPage} />
        <Route exact path="/derivative/:index" render={renderDerivativePage} />
        <Route exact path="/add-exercise" render={renderAddExercisePage} />
        <Route exact path="/profile" render={renderProfilePage} />
        <Route exact path="/courses/list" component={OwnCoursesPage} />
        <Route exact path="/statistics" render={renderStatisticsPage} />
        <Route path="/my-courses/:courseId/modules/:moduleId" render={renderCoursePage} />

        <Footer className={classes.footer} />

        {/* UTILS */}
        <SnackbarWrapper />
        <ProgressBar />
        <ModalContainer />
      </Router>
    </main>
  );
};

export default hot(module)(App);
