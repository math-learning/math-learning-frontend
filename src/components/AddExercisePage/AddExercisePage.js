import React, {Component} from 'react';
import { MathQuill } from '../MathText/mathquill-loader';
import MathTextBox from '../MathTextBox/MathTextBox';
import Button from '@material-ui/core/Button';
import styles from './AddExercisePage.css'

class AddExercisePage extends Component {
    
    handleExpressionChange(newExpression) {
        
    }

    handleGetResult(expression) {

    }

    handleAddExercise(expression) {
        let {result} = this.props
    }

    render () {

        let {result} = this.props

        return (
            <div className="add-exercise"> 
                <div className="App-content">
                
                <div className="form-title">
                    Nuevo Ejercicio:
                </div>
                
                <div className="math-text-box">
                    <MathTextBox 
                        content={""}
                        onContentChange={console.log}
                        onEnter={console.log}>
                    </MathTextBox>
                </div>
                
                <div className="form-title">
                    Resultado:
                </div>
                <div className="math-text-box">
                    <MathTextBox 
                        content={result}
                        onContentChange={console.log}
                        onEnter={console.log}>
                    </MathTextBox>
                </div>
                
                <Button onClick={this.handleGetResult.bind(this)} color="primary">
                    Generar resultado
                </Button>

                <Button onClick={console.log} color="primary">
                    Agregar Ejercicio
                </Button>
            </div>
            </div>
            
        )
    }
}

export default AddExercisePage