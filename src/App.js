import 'typeface-roboto';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Router, Switch } from 'react-router-dom';

import OwnCoursesPage from './components/scenes/courses/OwnCoursesPage';
import SearchCoursesPage from './components/scenes/courses/SearchCoursesPage';
import ExercisePage from './components/scenes/exercises/ExercisePage';
import CourseManagement from './components/scenes/courses/CoursePage';
import Main from './components/scenes/main/Main';
import ModalContainer from './components/Modals/ModalContainer';
import NavBar from './components/NavBar';
import ProgressBar from './components/ProgressBar';
import SnackbarWrapper from './components/SnackbarWrapper';
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

const App = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Router history={history}>
        <NavBar />
        <Switch>
          <Route exact path="/courses/search" component={SearchCoursesPage} />
          <Route exact path="/courses/:courseId" component={CourseManagement} />
          <Route exact path="/courses/:courseId/users" component={CourseManagement} />
          <Route exact path="/courses/:courseId/statistics" component={CourseManagement} />
          <Route exact path="/courses/:courseId/guides/:guideId" component={CourseManagement} />
          <Route exact path="/courses/:courseId/guides/:guideId/exercises/:exerciseId" component={ExercisePage} />
          <Route exact path="/courses" component={OwnCoursesPage} />
          <Route exact path="/" component={Main} />
        </Switch>

        <SnackbarWrapper />
        <ProgressBar />
        <ModalContainer />
      </Router>
    </main>
  );
};

export default hot(module)(App);
