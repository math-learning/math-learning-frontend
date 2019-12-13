import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
import { Typography } from '@material-ui/core';

// TODO: ver como pasarlo a sass (edita estilos de mathquill)
import styles from './MathTextBox.css';

addMathquillStyles();

class MathTextBox extends Component {
  constructor(props) {
    super(props);

    this.mathQuillEl = null;
  }

  UNSAFE_componentWillReceiveProps(props) {
    const { content } = props;

    if (!content) {
      this.onClear();
    }
  }

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

  onClear = () => {
    this.mathQuillEl.latex('');
  }

  render() {
    const { content, className } = this.props;

    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        onKeyPress={this.onKeyPress}
        onClick={this.onClick}
        className={classNames(
          styles.container,
          className
        )}
      >
        <Typography color="textPrimary" variant="h6">
          <MathQuill
            latex={content}
            onChange={(mathField) => {
              this.handleContentChange(mathField.latex());
            }}
            mathquillDidMount={(el) => {
              this.mathQuillEl = el;
            }}
          />
        </Typography>
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
