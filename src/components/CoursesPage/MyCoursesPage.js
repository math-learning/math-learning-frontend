import React, { Component } from 'react'
import { Container, Typography, Grid, Card } from '@material-ui/core'
import styles from './MyCoursesPage.module.sass'
import InteractiveLinkCard from '../InteractiveLinkCard/InteractiveLinkCard'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

export default class MyCoursesPage extends Component {
  render() {
    const {courses} = this.props
    return (
      <Container className={styles.defaultContainer} maxWidth="md">
        <Typography variant="h4" className={styles.title}>Mis Cursos</Typography>
        <Grid container spacing={3}>
          {
            courses.map(course => {
              return (
                <Grid item xs={12}>
                  <InteractiveLinkCard className={styles.courseCard} path="/pathname">
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                      <Typography>{course.name}</Typography>
                      </Grid>
                      <Grid item xs={5}>
                      {
                      course.professors.map(professor => {
                        return (
                          <Typography className={styles.professorItem} color="textSecondary" variant="body2" component="p">
                            * {professor}
                          </Typography>
                        )
                      })
                    }
                      </Grid>
                      <Grid item xs={3}>
                        [100%]
                      </Grid>
                    </Grid>
                    
                    
                    
                  </InteractiveLinkCard>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    )
  }
}