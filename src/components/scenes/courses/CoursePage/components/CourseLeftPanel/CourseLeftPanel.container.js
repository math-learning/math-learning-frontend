import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import configs from '../../../../../../configs/variables';
import CourseLeftPanel from './CourseLeftPanel';

const currentActions = (dispatch, { courseId }) => ({
  loadUsersPage: async () => {
    await dispatch(push(configs.pathGenerators.courseUsers(courseId)));
  }
});

export default connect(
  null,
  currentActions
)(CourseLeftPanel);
