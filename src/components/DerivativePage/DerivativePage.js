import React, {Component} from 'react';
import Derivative from '../Derivative'

class DerivativePage extends Component {

    render() {
        const {inputProblem} = this.props.location.state

        return (
            <div>
                <header id="header" className="App-header">
                    <h1>Titulo</h1>
                    <h2>Porfavor resuelva paso a paso la siguiente derivada</h2>
                </header>
            <div id="derivative-problem" className="App-content">
                <Derivative problemInput={inputProblem} />
            </div> 
            </div>
            
        )
    }
}

export default DerivativePage;