import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MathText from "../MathText/MathText";
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill'
import styles from './MathTextBox.css';
import { Typography } from '@material-ui/core';

addMathquillStyles()

class MathTextBox extends Component {

  handleContentChange = (content) => {
    this.props.onContentChange(content);
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter'){
      this.props.onEnter(this.props.content);
    }
  }

  render() {

    let {content} = this.props;

    return (
      <div
        id="math-box-text"
        className={styles.container}
        onKeyPress={this.onKeyPress}
        onClick={this.onClick}
      >
        <Typography>
          <MathQuill
            latex={content}
            onChange={mathField => {
              this.handleContentChange(mathField.latex())
            }}
          />
        </Typography>
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
