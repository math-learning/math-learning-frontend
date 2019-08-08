import React, { Component } from 'react';
import { MathQuill } from '../MathText/mathquill-loader';
import MathTextBox from '../MathTextBox/MathTextBox';
import Button from '@material-ui/core/Button';
import styles from './AddExercisePage.css'
import MathText from '../MathText'

class AddExercisePage extends Component {

    handleExpressionChange({ newExpression }) {
        this.props.handleExpressionChange({ newExpression });
    }

    handleResultChange({ newResult }) {
        this.props.handleResultChange({ newResult });
    }

    handleGetResult() {
        const { expression } = this.props;
        this.props.handleGetResult({ expression });
    }

    handleAddExercise(event) {
        let { result, expression } = this.props;
        this.props.handleAddExercise({ result, expression });
    }

    render() {

        var { result, expression } = this.props

        return (
            <div className="App-content">
                <div className="add-exercise">
                

                    <div className="form-title">
                        Nuevo Ejercicio:
                    </div>

                    <div className="math-text-box mt-md">
                        <MathTextBox
                            content={expression}
                            onContentChange={latex => {
                                this.handleExpressionChange({ newExpression: latex })
                            }}
                            onEnter={console.log}>
                        </MathTextBox>
                    </div>

                    <div className="form-title mt-md">
                        Resultado:
                    </div>
                    <MathText content={result} className="mt-md" />
                    <div className="math-text-box mt-md">
                        <MathTextBox
                            content={result}
                            onContentChange={newResult => this.handleResultChange({ newResult })}
                            onEnter={console.log}>
                        </MathTextBox>
                    </div>

                    <Button className="mt-md" onClick={this.handleGetResult.bind(this)} color="primary">
                        Generar resultado
                    </Button>

                    <Button className="mt-md" onClick={console.log} color="primary">
                        Agregar Ejercicio
                </Button>
                </div>
            </div>

        )
    }
}

export default AddExercisePage