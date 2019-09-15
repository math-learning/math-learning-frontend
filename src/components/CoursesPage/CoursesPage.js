import React, {Component, Fragment} from 'react';
import { Container, Typography, Grid, CardContent, Card, TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import styles from './CoursesPage.module.sass'
import EmptyCoursesPage from './EmptyCoursesPage'
import MyCoursesPage from './MyCoursesPage';
import CoursePage from '../CoursePage/CoursePage';

const onlyOneCourse = [
  {
    name: "Analisis matematico II - Curso 2",
    professors: [
      "Pedro",
      "Pedro2"
    ]
  }
]

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

  constructor(props) {
    super(props)
    this.state = {courses: onlyOneCourse}
  }

  render() {
    const {courses} = this.state
    let pageToDisplay = (<EmptyCoursesPage/>)
    if (courses.length === 1) {
      pageToDisplay = (<CoursePage course={courses[0]}/>)
    }
    else if (courses.length > 1) {
      pageToDisplay = (<MyCoursesPage courses={courses}/>)
    }

    return (
      <Fragment>

        {/* TODO: Eliminar */}
        <Button onClick={event=> this.setState({courses: onlyOneCourse})}>Un Curso</Button>
        <Button onClick={event=> this.setState({courses: mockedCourses})}>Varios Cursos</Button>
        <Button onClick={event=> this.setState({courses: []})}>Ningun Curso</Button>

        {
          pageToDisplay
        }

      </Fragment>
    )
  }
}











