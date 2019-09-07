import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './AddExercisePage.module.sass';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import MathText from '../MathText';
import MathTextBox from '../MathTextBox';

// TODO: redo this page
class AddExercisePage extends Component {
  goToHomePage() {
    const path = '/';
    this.props.history.push(path);
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

    this.props.handleGetResult({ expression });
  }

  handleAddExercise(event) {
    const { result, expression } = this.props;
    // TODO: check
    this.props.handleAddExercise({ result, expression });
  }

  render() {
    const { result, expression } = this.props;

    return (
      <div className="App-content">
        <div className="add-exercise">
          <div className="form-title">
            <Typography>
                        Nuevo Ejercicio
            </Typography>
          </div>

          <div className="form-title mt-md">
            <Typography>
                        Expresion inicial:
            </Typography>
          </div>

          <div className="math-text-box mt-md">
            <MathTextBox
              content={expression}
              onContentChange={(latex) => {
                this.handleExpressionChange({ newExpression: latex });
              }}
              onEnter={this.handleGetResult.bind(this)}
            />
          </div>

          <div className="form-title mt-md">
            <Typography>
                            Resultado:
            </Typography>
          </div>

          <div>
            {<MathText content={result} />}
          </div>

          <div className="form-title mt-md">
            <Typography>
                            Si el resultado  no es el esperado puede colocar el correcto aqui:
            </Typography>
          </div>

          <div className="math-text-box mt-md mb-lg">
            <MathTextBox
              content={result}
              onContentChange={(newResult) => this.handleResultChange({ newResult })}
            />
          </div>

          <Button variant="outlined" className="mt-md" onClick={this.handleGetResult.bind(this)} color="primary">
                        Generar resultado
          </Button>

          <Button className="mt-md" onClick={this.handleAddExercise.bind(this)} color="primary">
            {/* TODO: chequear que este todo bien */}
                        Agregar Ejercicio
          </Button>
        </div>
      </div>

    );
  }
}

export default withRouter(AddExercisePage);
