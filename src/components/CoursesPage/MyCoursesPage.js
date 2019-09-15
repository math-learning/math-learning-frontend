import React, { Component } from 'react'
import { Container, Typography, Grid, Card } from '@material-ui/core'
import styles from './MyCoursesPage.module.sass'

export default class MyCoursesPage extends Component {
  render() {
    const {courses} = this.props
    return (
      <Container className={styles.defaultContainer} maxWidth="md">
        <Typography variant="h4" className={styles.title}>Mis Cursos</Typography>
        <Grid container spacing={4}>
          {
            courses.map(course => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={styles.courseCard}>
                    <Typography>{course.name}</Typography>
                    {
                      course.professors.map(professor => {
                        return (
                          <Typography className={styles.professorItem} color="textSecondary" variant="body2" component="p">
                            * {professor}
                          </Typography>
                        )
                      })
                    }
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    )
  }
}