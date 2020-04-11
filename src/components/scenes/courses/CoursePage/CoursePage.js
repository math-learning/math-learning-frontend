import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import EmptyStatePage from '../../../common/containers/EmptyStatePage';
import CourseLeftPanel from './components/CourseLeftPanel';
import Guide from './components/Guide';
import CreateExercisePage from './components/CreateExercisePage';
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

  getHeader(isProfessor) {
    const { course, isUserPath, isStatisticsPath, isCreateExercisePath } = this.props;

    if (isUserPath || isStatisticsPath || isCreateExercisePath) {
      return null;
    }

    return (
      <CourseHeader
        id={course.courseId}
        name={course.name}
        course={course}
        canEdit={isProfessor && course.courseStatus !== 'published'}
        canDelete={isProfessor}
        description={course.description}
        isProfessor={isProfessor}
      />
    );
  }

  getContent(isProfessor) {
    const {
      courseId, guideId, course, guides, isUserPath, isStatisticsPath, isCreateExercisePath
    } = this.props;

    if (isUserPath) {
      return <CourseUsersPage course={course} />;
    }
    if (isStatisticsPath) {
      return <StatisticsPage course={course} />;
    }
    if (isCreateExercisePath) {
      return <CreateExercisePage courseId={courseId} guideId={guideId} />;
    }

    const firstGuide = guides[0];
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

    return (
      <EmptyStatePage
        title="El curso aún no cuenta con guías"
        subtitle="Crea alguna para comenzar a añadir ejercicios"
      />
    );
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
