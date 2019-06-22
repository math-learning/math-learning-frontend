import React, {Component} from 'react';
import ExerciseCard from '../ExerciseCard'
import styles from './ExercisesPage.css'

class ExercisesPage extends Component {

    render() {
        const exercises = [
            "Ejercicio 1",
            "Ejercicio 2",
            "Ejercicio 3",
            "Ejercicio 4",
            "Ejercicio 5",
        ]

    
        return (
            <div className="exercises-page">
                <div className="cards-container">
                    {exercises.map((key,value) =>   {
                        return (
                            <div className="exercise-card">
                                <ExerciseCard/>
                            </div>
                            )
                    })}
                </div>
                
            </div>
        )
    }
}

export default ExercisesPage;