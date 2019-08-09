import React, { Component } from 'react';
import MathTextBox from '../MathTextBox';
import Button from '@material-ui/core/Button';
import styles from './AddExercisePage.css'
import MathText from '../MathText'
import { withRouter } from 'react-router-dom';

class AddExercisePage extends Component {

    goToHomePage() {
        let path = `/`;
        this.props.history.push(path)
    }

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
        // TODO: check
        this.goToHomePage()
        this.props.handleAddExercise({ result, expression });
    }

    render() {

        var { result, expression } = this.props

        return (
            <div className="App-content">
                <div className="add-exercise">
                    <div className="form-title">
                        Nuevo Ejercicio
                    </div>

                    <div className="form-title mt-md">
                        Expresion inicial:
                    </div>

                    <div className="math-text-box mt-md">
                        <MathTextBox
                            content={expression}
                            onContentChange={latex => {
                                this.handleExpressionChange({ newExpression: latex })
                            }}>
                        </MathTextBox>
                    </div>

                    <div className="form-title mt-md">
                        Resultado:
                    </div>

                    <div>
                        <MathText content={this.props.result}/>
                    </div>

                    <div className="form-title mt-md">
                        Si el resultado  no es el esperado puede colocar el correcto aqui:
                    </div>
                    
                    <div className="math-text-box mt-md mb-lg">
                        <MathTextBox
                            content={this.props.result}
                            onContentChange={newResult => this.handleResultChange({ newResult })}
                            >
                        </MathTextBox>
                    </div>
                                
                    <Button className="mt-md" onClick={this.handleGetResult.bind(this)} color="primary">
                        Generar resultado
                    </Button>

                    
                    <Button className="mt-md" onClick={this.handleAddExercise.bind(this)} color="primary">
                        {/* TODO: chequear que este todo bien */}
                        Agregar Ejercicio
                    </Button>
                </div>
            </div>

        )
    }
}

export default withRouter(AddExercisePage)