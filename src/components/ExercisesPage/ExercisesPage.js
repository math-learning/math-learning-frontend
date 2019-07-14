import React, {Component} from 'react';
import ExerciseCard from '../ExerciseCard'
import PropTypes from 'prop-types'
import styles from './ExercisesPage.css'
import {Link} from 'react-router-dom'
import { isFinished } from '../../state/derivative/selectors';


class ExercisesPage extends Component {

    render() {

        const {exercises, finishedExercises} = this.props

        // TODO : Refactor
        const exerciseCards = exercises.map((element,index) =>   {
            const exerciseNumber = index + 1
            const finished = finishedExercises.some(elem => elem == index)
        
            return (
                <div className={"exercise-card" + (finished ? " finished" : "")}>
                    <Link to={{
                        pathname:'/derivative/' + index,
                    }} style={{ color: 'inherit',  textDecoration: 'none' }}>
                            <ExerciseCard title={"Ejercicio " + exerciseNumber} statement={element.input} finished={finished}/>
                        
                    </Link>
                </div>
                )
        })
    
        return (
            <div className="exercises-page">
                <header id="header" className="App-header">
                    <h1>Ejercicios de derivadas</h1>
                    <h2>Por favor seleccione el ejercicio que desea resolver</h2>
                </header>
                <div className="cards-container">
                    {exerciseCards}
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