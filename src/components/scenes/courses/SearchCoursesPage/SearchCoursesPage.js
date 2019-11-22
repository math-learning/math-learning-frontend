import {
  Container, Grid, Typography, TextField, CircularProgress, InputAdornment
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import React, { Component } from 'react';
import CourseCard from '../CourseCard';

import styles from './SearchCoursesPage.module.sass';

export default class OwnCourses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    const { isLoadingCourses, onSearchCourses } = this.props;

    if (isLoadingCourses) {
      onSearchCourses({ search: '' });
    }
  }

  onChangeSearch = (event) => {
    const newSearch = event.target.value;

    this.setState({ search: newSearch });
  }

  onKeyPress = (e) => {
    const { search } = this.state;
    const { onSearchCourses } = this.props;

    if (e.keyCode === 13) {
      onSearchCourses({ search });
    }
  }

  getContent = () => {
    const { isLoadingCourses, courses, onClickCourse } = this.props;

    if (isLoadingCourses) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }

    if (!courses.length) {
      return (
        <div className={styles.noCourses}>
          <Typography
            id="no-courses"
            variant="h4"
          >
            No hay cursos que coincidan con la búsqueda
          </Typography>
        </div>
      );
    }

    return (
      <Grid item xs={12} sm={12} md={12}>
        {courses.map((course) => (
          <CourseCard
            id={`course-${course.courseId}`}
            key={course.courseId}
            course={course}
            onClickCourse={onClickCourse}
          />
        ))}
      </Grid>
    );
  }

  render() {
    return (
      <Container className={styles.defaultContainer}>
        <Typography
          id="list-courses"
          variant="h4"
          className={styles.title}
        >
          Buscar cursos
        </Typography>
        <TextField
          id="search-box"
          label="Filtrar por nombre"
          className={styles.searchBox}
          onChange={this.onChangeSearch}
          onKeyDown={this.onKeyPress}
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
        <div className={styles.content}>
          {this.getContent()}
        </div>
      </Container>
    );
  }
}
