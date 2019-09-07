import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
import { Typography } from '@material-ui/core';
import MathText from '../MathText/MathText';
// TODO: ver como pasarlo a sass (edita estilos de mathquill)
import styles from './MathTextBox.css';

addMathquillStyles();

class MathTextBox extends Component {
  handleContentChange = (content) => {
    this.props.onContentChange(content);
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.props.onEnter(this.props.content);
    }
  }

  render() {
    const { content } = this.props;

    return (
      <div
        className={styles.container}
        onKeyPress={this.onKeyPress}
        onClick={this.onClick}
      >
        <Typography>
          <MathQuill
            latex={content}
            onChange={(mathField) => {
              this.handleContentChange(mathField.latex());
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
  onEnter: PropTypes.func,
};

export default MathTextBox;
