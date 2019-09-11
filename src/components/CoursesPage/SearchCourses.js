import React, { Component } from 'react'
import { Container, Typography, Grid, CardContent, Card, TextField } from '@material-ui/core'
import styles from './SearchCourses.module.sass'
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    name: "Analisis matematico II - Curso 2",
    professors: [
      "Pedro",
      "Pedro2"
    ]
  },
  {
    name: "Analisis matematico II - Curso 2",
    professors: [
      "Pedro",
      "Pedro2"
    ]
  }
]

function handleChange() {

}

export default class SearchCourses extends Component {
  render() {
    return (
      <Container className={styles.defaultContainer}>
        <Typography variant="h4" className={styles.title}>Buscar Cursos</Typography>
        <TextField
        startAd
        id="standard-name"
        label="Filtrar por nombre"
        className={styles.searchBox}
        fullWidth
        onChange={handleChange('name')}
        margin="normal"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
        <Grid item xs={12} sm={12} md={12}>
          {
            mockedCourses.map( course => {
              return (
                <Card className={styles.courseCard}>
          
                <CardContent>
                  <Typography className="title" color="textPrimary" gutterBottom>
                    {course.name}
                  </Typography>
          
                  <Typography className="statement" color="textSecondary" variant="body2" component="p">
                    {course.professors}
                  </Typography>
                </CardContent>
                
              </Card>
                )
            })
          }
        </Grid> 
        
      </Container>
    )
  }
}