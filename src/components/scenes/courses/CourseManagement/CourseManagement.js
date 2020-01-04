import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import styles from './CourseManagement.module.sass';
import Content from '../../../common/containers/Content/Content';
import ContentHeader from '../../../common/containers/Content/ContentHeader';
import EditableGuidesLeftPanel from './components/EditableGuidesLeftPanel';
import GuideManagement from './components/GuideManagement';
import CourseUsersPage from './components/CourseUsersPage';
import CourseInfoManagement from './components/CourseInfoManagement';

export default class CourseManagement extends Component {
  componentDidMount() { // TODO: improve it, the page is renderer more than one time
    const { courseId, getCourse, getGuides } = this.props;
    getCourse(courseId);
    getGuides(courseId);
  }

  getHeader() { // TODO: maybe we can have the header per page
    const { course, isUserPath } = this.props;

    if (isUserPath) { // TODO: diego, test if you prefer it or not :)
      return null;
    }

    return (
      <ContentHeader>
        <CourseInfoManagement // TODO: this could be just CourseHeader with an isEditable property
          id={course.courseId}
          name={course.name}
          description={course.description}
        />
      </ContentHeader>
    );
  }

  getContent() {
    const { course, guideId, isUserPath } = this.props;

    if (isUserPath) {
      return <CourseUsersPage course={course} />;
    }

    // TODO: maybe we can just send the course (or the guides)
    return <GuideManagement courseId={course.courseId} guideId={guideId} />;
  }

  render() {
    const {
      course, guides, isLoadingCourseDetail, isLoadingGuides
    } = this.props;
    let guide;

    if (isLoadingCourseDetail || isLoadingGuides) {
      return (
        <div className={styles.loadingRoot}>
          <CircularProgress disableShrink />
        </div>
      );
    }
    if (!guide) {
      // TODO: 1 guia
    }

    return (
      <div className={styles.root}>
        <Grid container>
          <EditableGuidesLeftPanel
            courseId={course.courseId}
            courseName={course.name}
            guides={guides}
          />

          <Content hasLeftPanel>
            {this.getHeader()}
            {this.getContent()}
          </Content>
        </Grid>
      </div>
    );
  }
}
