import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
import { Typography } from '@material-ui/core';
import MathText from '../MathText/MathText';
// TODO: ver como pasarlo a sass (edita estilos de mathquill)
import styles from './MathTextBox.css';

addMathquillStyles();

class MathTextBox extends Component {
  handleContentChange = (content) => {
    const { onContentChange } = this.props;

    onContentChange(content);
  }

  onKeyPress = (event) => {
    const { onEnter, content } = this.props;

    if (event.key === 'Enter') {
      onEnter(content);
    }
  }

  render() {
    const { content, className } = this.props;

    return (
      <div
        onKeyPress={this.onKeyPress}
        onClick={this.onClick}
        className={classNames(
          styles.container,
          className
        )}
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
  className: PropTypes.className,
  onContentChange: PropTypes.func,
  onEnter: PropTypes.func,
};

export default MathTextBox;
