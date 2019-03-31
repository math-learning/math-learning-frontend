import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const SERVER_URL = "http://localhost:5000";

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

  getOldExpression() {
    const stepList = this.state.stepList;
    if (stepList.length == 0) {
      return this.state.input_data;
    } else {
      return stepList[stepList.length - 1];
    }
  }



  getValidateRequestBody() {
    return {
      old_expression: this.getOldExpression(),
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


  showTheorems() {
    if (this.state.hintTheorems != null) {
      console.log(this.state.hintTheorems)
      alert(this.state.hintTheorems);
    } else {
      let expression = this.getOldExpression();
      axios.post(SERVER_URL + '/hints/theorems-that-apply', { expression, theorems: this.state.theorems })
        .then(response => {
          console.log(response)
          if (response.data != null) {
            this.setState({
              hintTheorems: response.data
            })
          }
        })
        .catch(console.log);
    }
  }

  validate(e) {
    e.preventDefault();
    this.setState({ invalid_input: false })
    axios.post(SERVER_URL + '/validations/new-step', this.getValidateRequestBody())
      .then(this.handleValidateResponse.bind(this))
      .catch(console.log);
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
          <h1>MATH LEARNING</h1>
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

            <div className="validate-result">
              <div><button>Validar resultado</button></div>
            </div>

            {/* container */}
          </div>


        </section>
      </div>
    );
  }
}

export default App;
