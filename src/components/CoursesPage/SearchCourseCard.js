import React, { Component } from 'react';
import {
  Card, CardContent, Typography, Grid, Button
} from '@material-ui/core';
import styles from './CourseCard.module.sass';

// TODO: Remove eslint-disable
export default class SearchCourseCard extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { course } = this.props;
    return (
      <Card className={styles.courseCard}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8} md={10}>

              <Typography className="title" color="textPrimary" gutterBottom>
                {course.name}
              </Typography>
              <Typography color="textSecondary" variant="body2" component="p">Profesores</Typography>
              {
              course.professors.map((professor) => (
                <Typography className={styles.professorItem} color="textSecondary" variant="body2" component="p">
                    *
                  {' '}
                  {professor}
                </Typography>
              ))
            }
            </Grid>
            <Grid item xs={12} sm={4} md={2} className={styles.buttonContainer}>
              <Button color="primary" className={styles.button}>Matricularme</Button>
            </Grid>
          </Grid>

        </CardContent>

      </Card>
    );
  }
}
