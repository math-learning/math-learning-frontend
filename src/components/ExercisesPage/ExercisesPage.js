import React, {Component} from 'react';
import ExerciseCard from '../ExerciseCard'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import { isFinished } from '../../state/derivative/selectors';
import { Typography, Grid } from '@material-ui/core';


class ExercisesPage extends Component {

    render() {

        const {exercises, finishedExercises} = this.props

        // TODO : Refactor
        const exerciseCards = exercises.map((element,index) =>   {
            const exerciseNumber = index + 1
            const finished = finishedExercises.some(elem => elem == index)
        
            return (
                
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <div className={(finished ? " finished" : "")}>
                        <Link to={{
                            pathname:'/derivative/' + index,
                        }} style={{ color: 'inherit',  textDecoration: 'none' }}>
                            
                                <ExerciseCard title={"Ejercicio " + exerciseNumber} statement={element.input} finished={finished}/>
                            
                        </Link>
                        </div>
                    </Grid>
                
                )
        })
    
        return (
            <div className="exercises-page">
                <header id="header" className="App-header">
                    <Typography variant="h2">Ejercicios de derivadas</Typography>
                    <Link to={{pathname: '/add-exercise'}}>Agregar Ejercicio</Link>
                </header>
                <div className="cards-container">
                    <Grid container spacing={4}>
                        {exerciseCards}
                    </Grid>

                </div>
                
            </div>
        )
    }
}

ExercisesPage.propTypes = {
    //TODO: array of exercise
    exercises: PropTypes.array
}

export default ExercisesPage;