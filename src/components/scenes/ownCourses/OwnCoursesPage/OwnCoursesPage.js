import {
  Container, Grid, TextField, Typography
} from '@material-ui/core';

import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import SearchCourseCard from './SearchCourseCard';
import styles from './SearchCourses.module.sass';

export default class SearchCourses extends Component {
  // constructor(props) {
  //   super(props);
  //   const { courses, isLoadingCourses } = this.props;

  //   if (!courses) {
  //     this.state({ isLoadingCourses });
  //   } else {
  //     this.state = { courses, isLoading: false };
  //   }
  // }

  componentDidMount() {
    const { isLoadingCourses, onLoadCourses } = this.props;

    if (isLoadingCourses) {
      onLoadCourses();
    }
  }

  getContent = () => {
    const { isLoadingCourses, courses } = this.props;

    return <CircularProgress disableShrink />;
    // if (isLoadingCourses) {
    // }

    // return (
    //   <Grid item xs={12} sm={12} md={12}>
    //     {courses.map((course) => (
    //       <SearchCourseCard course={course} />
    //     ))}
    //   </Grid>
    // );
  }

  render() {
    console.log('PROPS', this.props)
    // const registerButton = {
    //   text: 'Matricularme'
    // };
    return (
      <Container className={styles.defaultContainer}>
        <Typography variant="h4" className={styles.title}>Buscar Cursos</Typography>
        <TextField
          startAd
          id="standard-name"
          label="Filtrar por nombre"
          className={styles.searchBox}
          fullWidth
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
        {this.getContent()}
      </Container>
    );
  }
}
