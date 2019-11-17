import {
  Container, Grid, Typography, CircularProgress
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import CourseCard from '../CourseCard';
import EmptyCoursesPage from '../EmptyCoursesPage';

import styles from './OwnCoursesPage.module.sass';

export default class OwnCourses extends Component {
  componentDidMount() {
    const { isLoadingCourses, onLoadCourses } = this.props;

    if (isLoadingCourses) {
      onLoadCourses();
    }
  }

  getContent = () => {
    const { isLoadingCourses, courses } = this.props;

    if (isLoadingCourses) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }
    if (!courses.length) {
      return <EmptyCoursesPage />;
    }

    return (
      <Grid item xs={12} sm={12} md={12}>
        {courses.map((course) => (
          <CourseCard id={`course-${course.courseId}`} key={course.courseId} course={course} />
        ))}
      </Grid>
    );
  }

  render() {
    const { canAddCourse } = this.props;

    return (
      <Container className={styles.defaultContainer}>
        <div className={styles.title}>
          <Typography id="my-courses" variant="h4">
            Mis cursos
          </Typography>
          {canAddCourse
            ? (
              <Button id="create-new-course" variant="outlined" color="primary">
                  Crear nuevo curso
              </Button>
            ) : ''}
        </div>
        <div className={styles.content}>
          {this.getContent()}
        </div>
      </Container>
    );
  }
}
