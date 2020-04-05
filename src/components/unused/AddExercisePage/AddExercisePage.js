import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import MathText from '../../common/math/MathText';
import MathTextBox from '../../common/math/MathTextBox';
import './AddExercisePage.module.sass';

/* eslint-disable react/jsx-no-bind */
class AddExercisePage extends Component {
  shouldComponentUpdate(nextProps) {
    const { result } = this.props;

    const diffResult = result !== nextProps.result;
    return diffResult;
  }

  handleExpressionChange({ newExpression }) {
    const { handleExpressionChange } = this.props;

    handleExpressionChange({ newExpression });
  }

  handleResultChange({ newResult }) {
    const { handleResultChange } = this.props;

    handleResultChange({ newResult });
  }

  handleGetResult() {
    const { expression, handleGetResult } = this.props;

    handleGetResult({ expression });
  }

  handleAddExercise() {
    const { result, expression, handleAddExercise } = this.props;
    handleAddExercise({ result, expression });
  }

  goToHomePage() {
    const { history } = this.props;

    const path = '/';
    history.push(path);
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
                        Agregar Ejercicio
          </Button>
        </div>
      </div>

    );
  }
}

export default withRouter(AddExercisePage);
