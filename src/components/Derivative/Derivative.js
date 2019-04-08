import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MathTextBox from "./components/MathTextBox/MathTextBox";
import MathText from "./components/MathText/MathText";


// import './Derivative.css';

class Derivative extends Component {
  constructor(props) {
    super(props);
    this.state = { problem: props.mathProblem };
  }

  validateStep = async () => {
    this.setState({ invalid_input: false })
    const data = await this.validateNotInHistory(this.state.input_expression); // TODO: ESTO ESTA MAL, TENDRIA QUE SER POR ESTADO

    if( data ) {
      const validationStep = this.getValidateRequestBody();
      const validationResponse = await mathClient.validateNewStep(validationStep);
      this.handleValidateResponse(validationResponse);
    } else {
      this.setState({ invalid_input: true })
    }
  }

  render() {  
    return (
      <div className="derivative" >

        <section>

          <div className="container">
            <div className="wrapper">

              <div className="math-problem">
                <MathText content={this.state.mathProblem} onEnter={()=> { }} />
              </div>

              <div className="steps">
                {this.state.stepList.map(step => {
                  return (
                    <div className="valid-step" style={containerStyle}>
                      <div>
                        <span className="equal">=</span>
                        <span className="step">{step}</span>
                      </div>
                      <div>
                        <span className="tick">Bien!</span>
                      </div>
                    </div>
                  )
                })}

                <div className="add-step" style={containerStyle}>
                  <span onClick={this.showTheorems.bind(this)}>=</span>
                  <div>
                    <MathTextBox content={this.state.input_expression} onEnter={()=> { }} />
                  </div>
                  <div>
                    <button onClick={this.validateStep}>+</button>
                  </div>
                </div>
              </div>
            </div>


            <div>
              <MathTextBox onEnter={()=> { }} />
            </div>

            <div className="validate-result">
              <div><button onClick={this.validateStep}>Validar resultado</button></div>
            </div>


          </div>


        </section>

      </div>
    );
  }
}


Derivative.propTypes = {
  mathProblem: PropTypes.string
};

export default Derivative;
