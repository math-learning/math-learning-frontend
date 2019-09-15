import React, { Component, Fragment } from 'react'
import { Container, Typography, Grid } from '@material-ui/core'
import { ClippedDrawerUnderAppBar } from '../Drawers'
import styles from './CoursePage.module.sass'
import clsx from 'clsx'
import LinkListItemWithIcon from '../LinkListItemWithIcon'

const modules = [
  {
    name: "Derivadas",
    exercises: [
      {
        text: "resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2",
        exercise: "TODO"
      }

    ]
  }
]
export default class CoursePage extends Component {
  render() {
    const { course } = this.props
    return (
      <Grid container className={styles.root}>


        <Grid item md={2} className={styles.leftPanel}>
          Materia titulo
        </Grid>
        <Grid item md={8}>
          <Container className={styles.defaultContainer}>

            <Typography variantk="h2" color="primary" className={styles.title}>Guia 1: Derivadas</Typography>

          </Container>
        </Grid>

      </Grid>
    )
  }
}