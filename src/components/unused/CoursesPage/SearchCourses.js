import {
  Container, Grid, TextField, Typography
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import SearchCourseCard from './SearchCourseCard';
import styles from './SearchCourses.module.sass';

const mockedCourses = [
  {
    name: 'Analisis matematico II - Curso 2',
    professors: [
      'Pedro',
      'Pedro2'
    ]
  },
  {
    name: 'Analisis matematico Infinito - Curso 3',
    professors: [
      'Juan Manuel Fernandez Caeiro',
      'Pedro',
      'Pedro',
      'Pedro',
      'Pedro',
      'Pedro2'
    ]
  },
  {
    name: 'Fisica II - Curso 2',
    professors: [
      'Pedro',
      'Pedro2'
    ]
  },
  {
    name: 'Algebra II - Curso 3',
    professors: [
      'Pedro',
      'Pedro2'
    ]
  }
];

function handleChange() {

}

export default class SearchCourses extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const registerButton = {
      text: 'Matricularme'
    };
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
            mockedCourses.map((course) => (
              <SearchCourseCard course={course} button={registerButton} />
            ))
          }
        </Grid>

      </Container>
    );
  }
}
