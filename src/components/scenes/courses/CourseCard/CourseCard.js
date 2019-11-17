import React, { Component } from 'react';
import {
  Card, CardContent, Typography, Grid
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';
import AccessTime from '@material-ui/icons/AccessTime';
import classNames from 'classnames';
import styles from './CourseCard.module.sass';

export default class CourseCard extends Component {
  getProfessorsGrid() {
    const { course: { professors }, profile } = this.props;

    return (
      professors.map((professor) => {
        let className = styles.professorItem;
        if (professor.userId === profile.userId) {
          className = classNames(styles.professorItem, styles.ownCourse);
        }

        return (
          <Typography
            id={`professor-${professor.userId}`}
            key={professor.userId}
            color="textSecondary"
            variant="body2"
            className={className}
          >
            {professor.name}
          </Typography>
        );
      })
    );
  }

  getCourseDate() {
    const { course } = this.props;

    return `Creado en: ${new Date(course.createdAt).toLocaleDateString()}`;
  }

  render() {
    const {
      course, isDraft, isMine, onClickCourse
    } = this.props;

    return (
      <Card onClick={() => onClickCourse()} className={styles.courseCard}>
        <CardContent>
          <Grid container spacing={3} justify="space-between">
            <Grid item xs={12} sm={8} md={6}>
              <Typography id="course-title" variant="h5" color="textPrimary" className={styles.name}>
                {isMine
                  ? <SchoolIcon id="school-icon" fontSize="small" className={styles.icon} />
                  : ''}
                {isDraft
                  ? <AccessTime id="draft-icon" fontSize="small" className={styles.icon} />
                  : ''}
                {course.name}
              </Typography>

              <Typography id="course-description" variant="body1" color="textSecondary" className={styles.description}>
                {course.description}
              </Typography>

              <Typography id="course-date" variant="body2" color="textSecondary">
                {this.getCourseDate()}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4} md={2}>
              <Typography id="professors header" variant="subtitle1" color="textSecondary">
                Profesores
              </Typography>
              {this.getProfessorsGrid()}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
