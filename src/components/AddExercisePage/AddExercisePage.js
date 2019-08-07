import React, {Component} from 'react';
import { MathQuill } from '../MathText/mathquill-loader';
import MathTextBox from '../MathTextBox/MathTextBox';
import Button from '@material-ui/core/Button';
import styles from './AddExercisePage.css'

class AddExercisePage extends Component {
    
    handleExpressionChange({newExpression}) {
        this.props.handleExpressionChange({newExpression});
    }
    
    handleResultChange({newResult}) {
        this.props.handleResultChange({newResult});
    }

    handleGetResult() {
        const expression = this.props.expression;
        this.props.handleGetResult({expression});
    }

    handleAddExercise(event) {
        let {result, expression} = this.props;
        this.props.handleAddExercise({result, expression});
    }

    render () {

        let {result, expression} = this.props
        
        return (
            <div className="add-exercise"> 
                <div className="App-content">
                
                <div className="form-title">
                    Nuevo Ejercicio:
                </div>
                
                <div className="math-text-box">
                    <MathTextBox 
                        content={expression}
                        onContentChange={latex => {
                            this.handleExpressionChange(latex)
                        }}
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

                <Button onClick={console.log("clicked")} color="primary">
                    Agregar Ejercicio
                </Button>
            </div>
            </div>
            
        )
    }
}

export default AddExercisePage