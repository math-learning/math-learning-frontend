import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as coursesActions from '../../../../state/courses/actions';
import * as coursesSelector from '../../../../state/courses/selectors';
import * as commonSelector from '../../../../state/common/selectors';

import * as modalActions from '../../../../state/modals/actions';
import * as modalTypes from '../../../../state/modals/modalTypes';

import SearchCoursesPage from './SearchCoursesPage';

const currentState = (state) => {
  const courses = coursesSelector.getCoursesList(state);
  const profile = commonSelector.profile(state);
  const isLoadingCourses = coursesSelector.isLoadingCoursesList(state);

  return {
    profile,
    courses,
    isLoadingCourses
  };
};

const currentActions = (dispatch) => ({
  onSearchCourses: (params) => dispatch(coursesActions.searchCourses(params)),
  onClickCourse: (course) => dispatch(modalActions.loadModal(modalTypes.REGISTRATION_MODAL, { course }))
});

export default withRouter(connect(
  currentState,
  currentActions,
)(SearchCoursesPage));
