import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import configs from '../../../../configs/variables';

import EmptyCoursesPage from './EmptyCoursesPage';

const currentState = () => {
  const { coursesSearch } = configs.paths;

  return {
    searchCoursesPath: coursesSearch
  };
};

export default withRouter(connect(
  currentState
)(EmptyCoursesPage));
