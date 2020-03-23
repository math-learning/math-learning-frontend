import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import ContentHeader from '../../../common/containers/Content/ContentHeader';
import CourseLeftPanel from './components/CourseLeftPanel';
import Guide from './components/Guide';
import StatisticsPage from './components/StatisticsPage';
import CourseUsersPage from './components/CourseUsersPage';
import CourseHeader from './components/CourseHeader';

import styles from './CoursePage.module.sass';

export default class CoursePage extends Component {
  componentDidMount() {
    const { courseId, isLoadingCourse, getCourse } = this.props;

    if (isLoadingCourse) {
      getCourse(courseId);
    }
  }

  componentDidUpdate() {
    const { courseId, isLoadingCourse, getCourse } = this.props;

    if (isLoadingCourse) {
      getCourse(courseId);
    }
  }

  getHeader(isProfessor) { // TODO: maybe we can have the header per page
    const { course, isUserPath, isStatisticsPath } = this.props;

    if (isUserPath || isStatisticsPath) {
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
    const {
      course, guideId, isUserPath, isStatisticsPath
    } = this.props;

    if (isUserPath) {
      return <CourseUsersPage course={course} />;
    }
    if (isStatisticsPath) {
      return <StatisticsPage course={course} />;
    }

    const firstGuide = course.guides[0];
    if (firstGuide) {
      const guideIdToRender = guideId || (firstGuide && firstGuide.guideId);

      return (
        <Guide
          courseId={course.courseId}
          guideId={guideIdToRender}
          isProfessor={isProfessor}
        />
      );
    }

    return <div>Sin guias, curso vacio</div>;
  }

  render() {
    const {
      course, guides, isLoadingCourse, isProfessor
    } = this.props;

    if (isLoadingCourse) {
      return (
        <div className={styles.loadingRoot}>
          <CircularProgress disableShrink />
        </div>
      );
    }

    return (
      <div className={styles.root}>
        <CourseLeftPanel
          isProfessor={isProfessor}
          courseId={course.courseId}
          courseName={course.name}
          guides={guides}
        />

        <div className={styles.content}>
          {this.getHeader(isProfessor)}
          {this.getContent(isProfessor)}
        </div>
      </div>
    );
  }
}
