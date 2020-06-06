import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
import { Typography, TextField } from '@material-ui/core';
import * as latexUtils from '../../../../utils/latexUtils';
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
    if (!nextProps.content && nextProps.content !== this.props.content) { // TODO: veamos qué pasa con esto
      this.onClear();
    }
  }

  handleExpressionChange = (expression) => {
    const { onContentChange } = this.props;

    onContentChange(expression);
  }

  handleMathQuillExpressionChange = (newContent) => {
    const { latexMode } = this.props;

    if (this.latexEl && !latexMode) {
      this.latexEl.value = newContent;
    }
    this.handleExpressionChange(newContent);
  }

  handleLatexExpressionChange = (event) => {
    const { latexMode } = this.props;
    const newContent = event.target.value;

    if (this.mathQuillEl && latexMode) {
      this.mathQuillEl.latex(newContent);
    }
    this.handleExpressionChange(newContent);
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

  insertSymbol = (symbol) => {
    if (this.mathQuillEl) {
      if (!symbol.value) {
        this.mathQuillEl.write(symbol.latexValue);
      } else {
        this.mathQuillEl.typedText(symbol.value);
      }
      this.mathQuillEl.focus();
    }

    if (this.latexEl) {
      const valueToInsert = symbol.latexValue || symbol.value;
      const cleanedValue = latexUtils.cleanExpression(valueToInsert, false);
      const newContent = this.insertAtCursorPosition(cleanedValue, this.latexEl);

      this.handleExpressionChange(newContent);
    }
  }

  insertAtCursorPosition = (valueToInsert, ref) => {
    const cursorPosition = ref.selectionStart;
    const currentValue = ref.value;
    const newContent = currentValue.slice(0, cursorPosition) + valueToInsert + currentValue.slice(cursorPosition);

    ref.value = newContent; // eslint-disable-line
    ref.focus();
    ref.selectionStart = cursorPosition + valueToInsert.length; // eslint-disable-line

    return newContent;
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
              defaultValue={latexUtils.cleanExpression(content, false)}
              onChange={this.handleLatexExpressionChange}
              className={sasStyles.latex}
              fullWidth
              inputRef={(el) => {
                this.latexEl = el;
              }}
              size="small"
              margin="dense"
              variant="outlined"
            />

            <MathText content={content} renderMethod="mathjax" />
          </React.Fragment>
        ) : (
          <Typography color="textPrimary" variant="h6">
            <MathQuill
              latex={latexUtils.cleanExpression(content, true)}
              onChange={(mathField) => {
                this.handleMathQuillExpressionChange(mathField.latex());
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
