import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MathText from "../MathText/MathText";

import styles from './MathTextBox.css';

class MathTextBox extends Component {

  handleContentChange = (content) => {
    this.props.onContentChange(content);
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter' && this.props.content !== ''){
      this.props.onEnter(this.props.content);
    }
  }

  render() {
    return (
      <div
        id="math-box-text"
        className={styles.container}
        onKeyPress={this.onKeyPress}
        onClick={this.onClick}
      >
        <div id="text-box" className={styles.textBoxContainer}>
          <input
            type="text"
            autoFocus={true}
            className={styles.textBox}
            value={this.props.content}
            onChange={(e) => this.handleContentChange(e.target.value)}
          />
        </div>

        <MathText id="content" content={this.props.content} />
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
