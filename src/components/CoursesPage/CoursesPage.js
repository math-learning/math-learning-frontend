import { Button } from '@material-ui/core';
import React, { Component } from 'react';

import CoursePage from '../CoursePage/CoursePage';
import EmptyCoursesPage from './EmptyCoursesPage';
import MyCoursesPage from './MyCoursesPage';

const onlyOneCourse = [
  {
    name: 'Analisis matematico II - Curso 2',
    id: 'hash',
    professors: [
      'Pedro',
      'Pedro2'
    ]
  }
];

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

export default class CoursesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { courses: onlyOneCourse };
  }

  render() {
    const { courses } = this.state;
    let pageToDisplay = (<EmptyCoursesPage />);
    if (courses.length === 1) {
      pageToDisplay = (<CoursePage courseId="hash" />);
    } else if (courses.length > 1) {
      pageToDisplay = (<MyCoursesPage courses={courses} />);
    }

    return (
      <React.Fragment>

        {/* TODO: Eliminar */}
        <Button onClick={() => this.setState({ courses: onlyOneCourse })}>Un Curso</Button>
        <Button onClick={() => this.setState({ courses: mockedCourses })}>Varios Cursos</Button>
        <Button onClick={() => this.setState({ courses: [] })}>Ningun Curso</Button>

        {
          pageToDisplay
        }

      </React.Fragment>
    );
  }
}

