import 'typeface-roboto';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Router, Switch } from 'react-router-dom';

import AddExercisePage from './components/AddExercisePage';
import CoursePage from './components/CoursePage';
import OwnCoursesPage from './components/scenes/courses/OwnCoursesPage';
import SearchCoursesPage from './components/scenes/courses/SearchCoursesPage';
import ExercisePage from './components/scenes/exercises/ExercisePage';
import ExercisesPage from './components/ExercisesPage';
import Main from './components/Main';
import ModalContainer from './components/Modals/ModalContainer';
import NavBar from './components/NavBar';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ProgressBar from './components/ProgressBar';
import SnackbarWrapper from './components/SnackbarWrapper';
import StatisticsPage from './components/StatisticsPage/StatisticsPage';
import history from './store/history';
import CourseManagement from './components/scenes/courses/CoursePage';

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
        <Switch>
          <Route exact path="/exercises" render={renderExercisesPage} />
          <Route exact path="/add-exercise" render={renderAddExercisePage} />
          <Route exact path="/profile" render={renderProfilePage} />
          <Route exact path="/my-courses/:courseId/modules/:moduleId" render={renderCoursePage} />

          <Route exact path="/courses/search" component={SearchCoursesPage} />
          <Route exact path="/courses/:courseId" component={CourseManagement} />
          <Route exact path="/courses/:courseId/guides/:guideId" component={CourseManagement} />
          <Route exact path="/courses/:courseId/users" component={CourseManagement} />
          <Route exact path="/courses/:courseId/guides/:guideId/exercises/:exerciseId" component={ExercisePage} />
          <Route exact path="/courses" component={OwnCoursesPage} />
          <Route exact path="/statistics" render={renderStatisticsPage} />
          <Route exact path="/" component={Main} />
        </Switch>

        {/* UTILS */}
        <SnackbarWrapper />
        <ProgressBar />
        <ModalContainer />
      </Router>
    </main>
  );
};

export default hot(module)(App);
