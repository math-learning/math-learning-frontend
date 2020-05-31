import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
import { Typography, TextField } from '@material-ui/core';
import MathText from '../MathText';

import styles from './MathTextBox.css'; // eslint-disable-line no-unused-vars
import sasStyles from './MathTextBox.module.sass';

addMathquillStyles();

class MathTextBox extends Component {
  constructor(props) {
    super(props);

    this.mathQuillEl = null;
    this.latexEl = null;
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line react/destructuring-assignment
    if (!nextProps.content && nextProps.content !== this.props.content) {
      this.onClear();
    }
  }

  handleContentChange = (content) => {
    const { onContentChange } = this.props;

    onContentChange(content);
  }

  handleMathQuillContentChange = (newContent) => {
    const { latexMode } = this.props;

    if (this.latexEl && !latexMode) {
      this.latexEl.value = newContent;
    }
    this.handleContentChange(newContent);
  }

  handleLatexContentChange = (event) => {
    const { latexMode } = this.props;
    const newContent = event.target.value;

    if (this.mathQuillEl && latexMode) {
      this.mathQuillEl.latex(newContent);
    }
    this.handleContentChange(newContent);
  }

  onKeyPress = (event) => {
    const { onEnter, content } = this.props;

    if (event.key === 'Enter') {
      onEnter(content);
    }
  }

  onClear = () => {
    if (this.mathQuillEl) {
      this.mathQuillEl.latex('');
    }
  }

  render() {
    const { content, latexMode, className } = this.props;

    return (
      <div
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
        className={classNames(sasStyles.container, className)}
      >
        {latexMode ? (
          <React.Fragment>
            <TextField
              id="latex-text-field"
              defaultValue={content}
              onChange={this.handleLatexContentChange}
              className={sasStyles.latex}
              fullWidth
              inputRef={(el) => {
                this.latexEl = el;
              }}
              size="small"
              margin="dense"
              variant="outlined"
            />

            <MathText content={content} renderMethod="math-jax" />
          </React.Fragment>
        ) : (
          <Typography color="textPrimary" variant="h6">
            <MathQuill
              latex={content}
              onChange={(mathField) => {
                this.handleMathQuillContentChange(mathField.latex());
              }}
              mathquillDidMount={(el) => {
                this.mathQuillEl = el;
              }}
            />
          </Typography>
        )}
      </div>
    );
  }
}

MathTextBox.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
  onContentChange: PropTypes.func,
  onEnter: PropTypes.func,
};

export default MathTextBox;
