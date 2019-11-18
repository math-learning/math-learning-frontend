import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as userUtils from '../../../../utils/userUtils';
import * as coursesActions from '../../../../state/courses/actions';
import * as coursesSelector from '../../../../state/courses/selectors';
import * as commonSelector from '../../../../state/common/selectors';

import OwnCoursesPage from './OwnCoursesPage';

const currentState = (state) => {
  const courses = coursesSelector.getOwnCourses(state);
  const profile = commonSelector.profile(state);
  const canAddCourse = userUtils.canAddCourse(profile);
  const isLoadingCourses = coursesSelector.isLoadingCourses(state);

  return {
    profile,
    courses,
    canAddCourse,
    isLoadingCourses
  };
};

const currentActions = (dispatch) => ({
  onLoadCourses: () => dispatch(coursesActions.getCourses({}))
});

export default withRouter(connect(
  currentState,
  currentActions,
)(OwnCoursesPage));
