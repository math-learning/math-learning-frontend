import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MathText from "../MathText/MathText";

import './MathTextBox.css';

class MathTextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      autoFocus: true,
      content: props.content || '',
      isBoxEnabled: true
    };
  }
  
  componentWillReceiveProps = (newProps) => {
    if (this.state.content != newProps.content) {
      this.setState({ content: newProps.content, autoFocus: true });
    }
    this.setState({ isBoxEnabled: true });
  }

  handleContentChange = (content) => {
    this.setState({ content });
    this.props.onContentChange(content);
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
        className="MathBox-container"
        onKeyPress={this.onKeyPress}
        onClick={this.onClick}
      >
        <div className="MathBox-text-box-container">
          { this.state.isBoxEnabled ?
            (<input
              id="box"
              type="text"
              autoFocus={this.state.autoFocus}
              className="MathBox-text-box"
              value={this.state.content}
              onChange={(e) => this.handleContentChange(e.target.value)}
            />
            ) : ''
          }
        </div>

        <MathText content={this.state.content} />
      </div>
    );
  }
}


MathText.propTypes = {
  content: PropTypes.string,
  onContentChange: PropTypes.func,
  onEnter: PropTypes.func
};

export default MathTextBox;
