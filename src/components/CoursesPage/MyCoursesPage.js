import { Container, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import InteractiveLinkCard from '../InteractiveLinkCard/InteractiveLinkCard';

import styles from './MyCoursesPage.module.sass';

// TODO: Remove eslint-disable
export default class MyCoursesPage extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { courses } = this.props;
    return (
      <Container className={styles.defaultContainer} maxWidth="md">
        <Typography variant="h4" className={styles.title}>Mis Cursos</Typography>
        <Grid container spacing={3}>
          {
            courses.map((course) => (
              <Grid item xs={12}>
                <InteractiveLinkCard className={styles.courseCard} path="/pathname">
                  <Grid container spacing={2}>
                    <Grid item xs={4} className={styles.center}>
                      <Typography>{course.name}</Typography>
                    </Grid>
                    <Grid item xs={7} className={styles.center}>
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
                    <Grid item xs={1} className={styles.center}>
                      <Typography>
                        [100%]
                      </Typography>
                    </Grid>
                  </Grid>

                </InteractiveLinkCard>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    );
  }
}
