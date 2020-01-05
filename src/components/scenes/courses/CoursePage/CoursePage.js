import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { CircularProgress } from '@material-ui/core';
import styles from './CoursePage.module.sass';
import Content from '../../../common/containers/Content/Content';
import ContentHeader from '../../../common/containers/Content/ContentHeader';
import CourseLeftPanel from './components/CourseLeftPanel';
import Guide from './components/Guide';
import CourseUsersPage from './components/CourseUsersPage';
import CourseHeader from './components/CourseHeader';

export default class CoursePage extends Component {
  componentDidMount() {
    const {
      courseId,
      isLoadingCourse,
      getCourse
    } = this.props;

    if (isLoadingCourse) {
      getCourse(courseId);
    }
  }

  getHeader(isProfessor) { // TODO: maybe we can have the header per page
    const { course, isUserPath } = this.props;

    if (isUserPath) { // TODO: diego, test if you prefer it or not :)
      return null;
    }

    return (
      <ContentHeader>
        <CourseHeader // TODO: this could be just CourseHeader with an isEditable property
          id={course.courseId}
          name={course.name}
          description={course.description}
          isProfessor={isProfessor}
        />
      </ContentHeader>
    );
  }

  getContent(isProfessor) {
    const { course, guideId, isUserPath } = this.props;

    if (isUserPath) {
      return <CourseUsersPage course={course} />;
    }

    // TODO: maybe we can just send the course (or the guides)
    return (
      <Guide
        courseId={course.courseId}
        guideId={guideId}
        isProfessor={isProfessor}
      />
    );
  }

  render() {
    const {
      course, guides, isLoadingCourse,
      profile
    } = this.props;
    let guide;

    if (isLoadingCourse) {
      return (
        // TODO: align to the center
        <div className={styles.loadingRoot}>
          <CircularProgress disableShrink />
        </div>
      );
    }

    if (!course) {
      return '';
    }

    const isProfessor = course
      && course.professors
      && course.professors.some((professor) => professor.userId === profile.userId);

    if (!guide) {
      // TODO: 1 guia
    }

    return (
      <div className={styles.root}>
        <Grid container>
          <CourseLeftPanel
            isProfessor={isProfessor}
            courseId={course.courseId}
            courseName={course.name}
            guides={guides}
          />

          <Content hasLeftPanel>
            {this.getHeader(isProfessor)}
            {this.getContent(isProfessor)}
          </Content>
        </Grid>
      </div>
    );
  }
}
