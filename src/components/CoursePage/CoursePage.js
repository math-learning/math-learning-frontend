import React, { Component } from 'react'
import styles from 'CoursesPage.module.sass'
import { Container, Typography } from '@material-ui/core'

export default class CoursePage extends Component {
  render() {
    const {course} = this.props
    return (
      <Container className={styles.defaultContainer}>
        <Typography variantk="h4">course.name</Typography>
        
      </Container>
    )
  }
}