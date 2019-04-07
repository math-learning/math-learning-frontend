import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import MathTextBox from "./components/MathTextBox/MathTextBox";

const confs = require("./configs/variables")
const serverUrl = confs.serverUrl;




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

  getLastExpression() {
    const stepList = this.state.stepList;
    if (stepList.length == 0) {
      return this.state.input_data;
    } else {
      return stepList[stepList.length - 1];
    }
  }


  validateNotInHistory(new_expression) {
    let history = [];
    history.push(this.state.input_data);
    this.state.stepList.forEach(element => {
      history.push(element)
    })
    let requestData = {
      history,
      new_expression
    }
    return axios.post(serverUrl + '/validations/not-in-history', requestData);
  }

  getValidateRequestBody() {
    return {
      old_expression: this.getLastExpression(),
      new_expression: this.state.input_expression,
      theorems: this.state.theorems
    }
  }


  handleValidateResponse(response) {
    console.log(response);
    if (response.data) {
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

  showTheorems() {
    if (this.state.hintTheorems != null) {
      this.alertHintTheorems();
    } else {
      let expression = this.getLastExpression();
      axios.post(serverUrl + '/hints/theorems-that-apply', { expression, theorems: this.state.theorems })
        .then(response => {
          console.log(response)
          if (response.data != null) {
            this.setState({
              hintTheorems: response.data
            })
            this.alertHintTheorems();
          }
        })
        .catch(console.log);
    }
  }

  validateResult(e) {
    e.preventDefault();
    
    let requestData = {
      input_data: this.state.input_data,
      theorems: this.state.theorems,
      result: this.getLastExpression() 
    }

    axios.post(serverUrl + '/validations/result', requestData)
      .then(response => {
        if (response.data) {
          console.log(response.data);
          alert("Felicitaciones!! has conseguido completar el ejercicio!");
        } else {
          alert("respuesta equivocada")
        }
      })
      .catch(console.log);
  }

  validateNewStepIfNotInHistory(response) {
    if( response.data ) {
      axios.post(serverUrl + '/validations/new-step', this.getValidateRequestBody())
      .then(this.handleValidateResponse.bind(this))
      .catch(console.log);
    } else {
      this.setState({ invalid_input: true })
    }
  }

  validate(e) {
    e.preventDefault();
    this.setState({ invalid_input: false })
    this.validateNotInHistory(this.state.input_expression)
    .then(this.validateNewStepIfNotInHistory.bind(this))
    
  }

  set_input_expression(e) {
    e.preventDefault();
    
    this.setState({ input_expression: e.target.value, invalid_input: false })
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
                    <span onClick={this.showTheorems.bind(this)}>=</span>
                    <input className="expression-input" type='text' value={this.state.input_expression} onChange={this.set_input_expression.bind(this)}></input>
                  </div>
                  <div>
                    <button onClick={this.validate.bind(this)}>+</button>
                  </div>

                  
                </div>
              </div>
            </div>


            <div>
              <MathTextBox onEnter={()=> { }} />
            </div>

            <div className="validate-result">
              <div><button onClick={this.validateResult.bind(this)}>Validar resultado</button></div>
            </div>

            {/* container */}
          </div>


        </section>
      </div>
    );
  }
}

export default App;
