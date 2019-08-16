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

    shouldComponentUpdate(nextProps) {
        const diffResult = this.props.result !== nextProps.result;
        return diffResult;
    }

    handleExpressionChange({ newExpression }) {
        this.props.handleExpressionChange({ newExpression });
    }

    handleResultChange({ newResult }) {
        this.props.handleResultChange({ newResult });
    }

    handleGetResult() {
        const { expression } = this.props;
        if( expression != null && expression !== '') {
            this.props.handleGetResult({ expression });
        } else {
            this.props.showError({message: "La expresion ingresada es invalida"});
        }
            
    }

    handleAddExercise(event) {
        let { result, expression } = this.props;
        // TODO: check
        if (result == '' || expression == '') {
            this.props.showError({message: "Por favor complete todos los campos antes de continuar"});
            return;
        }
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
                            }}
                            onEnter={this.handleGetResult.bind(this)}
                            >
                        </MathTextBox>
                    </div>

                    <div className="form-title mt-md">
                        Resultado:
                    </div>

                    <div>
                        {<MathText content={result}/>}
                    </div>

                    <div className="form-title mt-md">
                        Si el resultado  no es el esperado puede colocar el correcto aqui:
                    </div>
                    
                    <div className="math-text-box mt-md mb-lg">
                        <MathTextBox
                            content={result}
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