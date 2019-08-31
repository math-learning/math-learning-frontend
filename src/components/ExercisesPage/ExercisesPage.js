import React, {Component} from 'react';
import ExerciseCard from '../ExerciseCard'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { isFinished } from '../../state/derivative/selectors';
import { Typography, Grid, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
    
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardContent: {
      flexGrow: 1,
    },
    linkCard: {
      height: '100%',
      textDecoration: 'none',
      color: 'inherit'
    },
    fullWidth: {
      width: '100%'
    }

  }));


export default function ExercisesPage(props) {

        const classes = useStyles()
        const {exercises, finishedExercises} = props

        // TODO : Refactor
        const exerciseCards = exercises.map((element,index) =>   {
          const exerciseNumber = index + 1
          const finished = finishedExercises.some(elem => elem == index)
          
          return (
              <Grid item key={index} xs={12} sm={6} md={4} >
                  <div className={clsx(finished && "finished", classes.card)}>
                    <Link to={{
                        pathname:'/derivative/' + index,
                    }} className={classes.linkCard}>
                        <ExerciseCard title={"Ejercicio " + exerciseNumber} statement={element.input} finished={finished} className={classes.card}/>
                    </Link>
                  </div>
              </Grid>
              )
          }
        )
    
        return (
            <div className="exercises-page">
                <header id="header" className="App-header">
                    <Typography variant="h2">Ejercicios de derivadas</Typography>
                    
                </header>
                <div className={classes.cardGrid}>
                    <Grid container spacing={4}>
                        {exerciseCards}
                    </Grid>
                </div>
                <Link to={{pathname: '/add-exercise'}} className={classes.fullWidth}><Button className={classes.fullWidth} color="secondary">Agregar Ejercicio</Button></Link>
            </div>
        )
    
}

ExercisesPage.propTypes = {
    //TODO: array of exercise
    exercises: PropTypes.array
}
