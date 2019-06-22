import React, {Component} from 'react';
import ExerciseCard from '../ExerciseCard'
import PropTypes from 'prop-types'
import styles from './ExercisesPage.css'
import {Link} from 'react-router-dom'


class ExercisesPage extends Component {

    render() {
        const exercises = [
            "\\frac{d\\left(e^x.\\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}"
          ]

        const exerciseCards = exercises.map((key,value) =>   {
            return (
                <Link to={{
                    pathname:'/derivative',
                    state: { inputProblem: key }
                }}>
                    <div className="exercise-card">
                        <ExerciseCard number={1} statement={key}/>
                    </div>
                </Link>
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