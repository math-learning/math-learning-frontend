import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MathText from "../MathText/MathText";

// import './MathTextBox.css';

class MathTextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content || '',
      isBoxEnabled: true
    };
  }

  onClick = () => {
    this.setState({ isBoxEnabled: true });
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter'){
      this.setState({ isBoxEnabled: false });
      this.props.onEnter(this.state.content);
    }
  }

  render() {  
    return (
      <div
        className="MathText"
        onKeyPress={this.onKeyPress}
        onClick={this.onClick}
      >
        { this.state.isBoxEnabled ? 
          (<input
            id="box"
            type="text" 
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
          />) : ''
        }

        <MathText content = {this.state.content} />
      </div>
    );
  }
}


MathText.propTypes = {
  content: PropTypes.string,
  onEnter: PropTypes.func
};

export default MathTextBox;
