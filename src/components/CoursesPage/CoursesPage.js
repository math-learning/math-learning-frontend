import React, {Component} from 'react';
import { Container, Typography, Grid, CardContent, Card, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import styles from './CoursesPage.module.sass'

const mockedCourses = [
  {
    name: "Analisis matematico II - Curso 2",
    professors: [
      "Pedro",
      "Pedro2"
    ]
  },
  {
    name: "Analisis matematico Infinito - Curso 3",
    professors: [
      "Juan Manuel Fernandez Caeiro",
      "Pedro",
      "Pedro",
      "Pedro",
      "Pedro",
      "Pedro2"
    ]
  },
  {
    name: "Fisica II - Curso 2",
    professors: [
      "Pedro",
      "Pedro2"
    ]
  },
  {
    name: "Algebra II - Curso 3",
    professors: [
      "Pedro",
      "Pedro2"
    ]
  }
]


export default class CoursesPage extends Component {
  render() {
    return (
      <Container className={styles.defaultContainer}>
        <Typography variant="h4" className={styles.title}>Mis Cursos</Typography>
        <Grid container spacing={4}>
          
            {
              mockedCourses.map( course => {
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











