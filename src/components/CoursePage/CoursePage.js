import React, { Component, Fragment } from 'react'
import { Container, Typography, Grid, Divider, List, ListItem, Card } from '@material-ui/core'
import styles from './CoursePage.module.sass'

import LinkListItemWithIcon from '../LinkListItemWithIcon'
import { number } from 'prop-types'

const modules = [
  {
    name: "Derivadas",
    number: 1,
    exercises: [
      {
        text: "resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2",
        exercise: "TODO",
        difficulty: "Dificil",
        state: "TODO"
      },
      {
        text: "resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2",
        exercise: "TODO",
        difficulty: "Intermedio",
        state: "DONE",
      },
      {
        text: "resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2",
        exercise: "TODO",
        difficulty: "Facil",
        status: "TODO"
      }

    ]
  },
  {
    name: "Integrales",
    number: 2,
    exercises: [
      {
        text: "resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2",
        exercise: "TODO",
        difficulty: "Dificil",
        state: "TODO"
      },
      {
        text: "resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2",
        exercise: "TODO",
        difficulty: "Intermedio",
        state: "DONE",
      },
      {
        text: "resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2",
        exercise: "TODO",
        difficulty: "Facil",
        status: "TODO"
      }

    ]
  }
]
export default class CoursePage extends Component {
  render() {
    const { course } = this.props
    const exercises = modules[0].exercises
    return (
      <Grid container className={styles.root}>


        <Grid item sm={4} md={2} className={styles.leftPanel} xs={12}>
          <List>
            <ListItem>
              <Typography className={styles.leftPanelTitle}>Analisis II A - Curso 3</Typography>
            </ListItem>

            <div className={styles.divider}>
              <Divider variant="middle" />
            </div>
            {modules.map(module => {
              return (<LinkListItemWithIcon className={styles.textCenter} path="/" icon={"Guia " + module.number + ":"} text={module.name} />)
            })}
          </List>
        </Grid>
        <Grid item sm={8} md={10} xs={12}>
          <Container className={styles.defaultContainer}>
            
            <Typography variant="h4" color="primary" className={styles.title}>Guia 1: Derivadas</Typography>
            
            {exercises.map(exercise => {
              return (<Card>
                asdfasd
              </Card>)
            })}

          </Container>
        </Grid>

      </Grid>
    )
  }
}