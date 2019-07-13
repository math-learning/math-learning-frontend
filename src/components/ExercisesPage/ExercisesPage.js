import React, {Component} from 'react';
import ExerciseCard from '../ExerciseCard'
import PropTypes from 'prop-types'
import styles from './ExercisesPage.css'
import {Link} from 'react-router-dom'


class ExercisesPage extends Component {

    render() {

        const exercises = this.props.exercises

        // TODO : Refactor
        const exerciseCards = exercises.map((element,index) =>   {
            const exerciseNumber = index + 1
            return (
                <div className="exercise-card">
                    <Link to={{
                        pathname:'/derivative/' + index,
                    }} style={{ color: 'inherit',  textDecoration: 'none' }}>
                            <ExerciseCard title={"Ejercicio " + exerciseNumber} statement={element.input}/>
                        
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