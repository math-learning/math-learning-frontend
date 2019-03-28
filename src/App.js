import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

const SERVER_URL = "http://localhost:5000";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
        this.setState({stepList: [...this.state.stepList, this.state.input_expression]});
      } else {
        console.log("Invalid request");
        this.setState({invalid_input: true})
      }
  }

  validate(e) {
    e.preventDefault();
    this.setState({invalid_input: false})
    axios.post(SERVER_URL+'/validate', this.getValidateRequestBody())
      .then(this.handleValidateResponse.bind(this))
      .catch(console.log);
  }

  set_input_expression(e) {
    e.preventDefault();
    this.setState({input_expression: e.target.value})
  }

  render() {
    const containerStyle = {
      display: 'inline'
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>MATH LEARNING</h1>
          <h2>Calcule paso a paso la siguiente derivada</h2> =
          <p> {this.state.input_data} </p>

          {this.state.stepList.map(item => {
            return <div className="valid-step" style={containerStyle}>
              <span>= {item}</span> <span>tick</span>
            </div>
          })}

          <div className="add-step-container" style={containerStyle}>
            <input type='text' value={this.state.input_expression} onChange={ this.set_input_expression.bind(this) }></input> <button onClick={this.validate.bind(this)}>+</button>
            { this.state.invalid_input ?<span>Invalid Input</span> : ""}
          </div>


        </header>
      </div>
    );
  }
}

export default App;
