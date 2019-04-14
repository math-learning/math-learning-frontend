import './App.css';
import React, { Component } from 'react';
import mathClient from './clients/mathClient';
import MathTextBox from './components/MathTextBox/MathTextBox';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      hintTheorems: null,
      stepList: [],
      input_expression: "Derivative(x,x) + Derivative(x,x)",
      input_data: "Derivative(x + x ,x)",
      invalid_input: false,
      theorems: [{
        name: "derivada de la suma",
        left: "Derivative(f(x) + g(x) , x)",
        right: "Derivative(f(x), x) + Derivative(g(x), x)"
      },
      {
        name: "derivada del producto",
        left: "Derivative(f(x) * g(x) , x)",
        right: "Derivative(f(x), x) * g(x) + Derivative(g(x), x) * f(x)"
      },
      {
        name: "derivada de la division",
        left: "Derivative(f(x) / g(x) , x)",
        right: "Derivative(( f(x), x) * g(x) - Derivative(g(x), x) * f(x)) / ( g(x)** 2)"
      }
      ]
    }
  }

  set_input_expression = (value) => {
    this.setState({ input_expression: value, invalid_input: false })
  }

  getLastExpression = () => {
    const stepList = this.state.stepList;
    if (stepList.length == 0) {
      return this.state.input_data;
    } else {
      return stepList[stepList.length - 1];
    }
  }

  getValidateRequestBody = () => {
    return {
      old_expression: this.getLastExpression(),
      new_expression: this.state.input_expression,
      theorems: this.state.theorems
    }
  }

  handleValidateResponse = (data) => {
    if (data) {
      this.setState({
        stepList: [...this.state.stepList, this.state.input_expression],
        hintTheorems: null
      });
    } else {
      console.log("Invalid request");
      this.setState({ invalid_input: true })
    }
  }

  alertHintTheorems() {
    let message = "";
    if ( this.state.hintTheorems.length != 0 ) {
      message = "Probaste usando lo siguiente?"
      this.state.hintTheorems.forEach(element => {
        message += "\n" + element.name;
      });
    } else {
      message = "Proba validando el resultado";
    }
    
    alert(message)
  }

  showTheorems = async () => {
    if (this.state.hintTheorems) {
      this.alertHintTheorems();
    } else {
      const expression = this.getLastExpression();
      const theorems = this.state.theorems;
      const newTheorems = await mathClient.getTheoremes(expression, theorems);

      if (newTheorems) {
        this.setState({ hintTheorems: newTheorems })
        this.alertHintTheorems();
      }
    }
  }

  validateResult = async () => {
    const result = {
      input_data: this.state.input_data,
      theorems: this.state.theorems,
      result: this.getLastExpression() 
    }

    const data = await mathClient.validateResult(result);

    if (data) {
      alert("Felicitaciones!! has conseguido completar el ejercicio!");
    } else {
      alert("respuesta equivocada")
    }
  }

  validateNotInHistory = (new_expression) => {
    let expressionHistory = [this.state.input_data];
    this.state.stepList.forEach(element => {
      expressionHistory.push(element)
    });

    return mathClient.validateNotInHistory(new_expression, expressionHistory);
  }

  validateStep = async () => {
    this.setState({ invalid_input: false })
    const data = await this.validateNotInHistory(this.state.input_expression);

    if( data ) {
      const validationStep = this.getValidateRequestBody();
      const validationResponse = await mathClient.validateStep(validationStep);
      this.handleValidateResponse(validationResponse);
    } else {
      this.setState({ invalid_input: true })
    }
  }

  render() {
    const containerStyle = {
      display: 'inline'
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>Math Learning</h1>
          <h2>Calcule paso a paso la siguiente derivada</h2>
        </header>

        <section>
          <div className="container">
            <div className="wrapper">
              <div className="input-data">
                <p> {this.state.input_data} </p>
              </div>

              <div className="steps">
                {this.state.stepList.map(item => {
                  return <div className="valid-step right-formula" style={containerStyle}>
                    <div>
                      <span className="equal">=</span>
                      <span>{item}</span>
                    </div>
                    <div>
                      <span className="tick">Bien!</span>
                    </div>

                  </div>
                })}

                <div className="add-step-container right-formula" style={containerStyle}>
                  {this.state.invalid_input ? <div className="invalid-input">La expresion ingresada es incorrecta!</div> : ""}
                  {this.state.invalid_input ? <div></div> : ""}
                  <div>
                    <span onClick={this.showTheorems}>=</span>

                    <div className="expression-input">
                      <MathTextBox content={this.state.input_expression} onEnter={(value) => this.set_input_expression(value)} />
                    </div>
                    {/* <input className="expression-input" type='text' value={this.state.input_expression} onChange={this.set_input_expression}></input> */}
                  </div>
                  <div>
                    <button onClick={this.validateStep}>+</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="validate-result">
              <div><button onClick={this.validateResult}>Validar resultado</button></div>
            </div>

          </div>


        </section>
      </div>
    );
  }
}

export default App;
