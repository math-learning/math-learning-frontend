import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill';
import MathText from '../MathText';

import styles from './MathTextBox.css'; // eslint-disable-line no-unused-vars
import sasStyles from './MathTextBox.module.sass';

addMathquillStyles();

class VariableTextBox extends Component {
  // TODO: Agregar integración con la tabla. Probablemente haya que agregar el insert in index, o directamente heredar de MathBox
  handleChangeTag = (newTagValue) => {
    const { onContentChange, variable } = this.props;

    onContentChange({ ...variable, tag: newTagValue });
  }

  handleChangeExpression = (newExpression) => {
    const { onContentChange, variable } = this.props;

    onContentChange({ ...variable, expression: newExpression });
  }

  renderTag = () => {
    const { variable: { tag }, readOnly = false } = this.props;

    if (readOnly) {
      return <MathText content={tag} className={sasStyles.mathText} />;
    }

    return (
      <MathQuill
        latex={tag}
        onChange={(mathField) => this.handleChangeTag(mathField.latex())}
      />
    );
  }

  renderVariable = () => {
    const { variable: { expression }, readOnly = false } = this.props;

    if (readOnly) {
      return <MathText content={expression} className={sasStyles.mathText} />;
    }

    return (
      <MathQuill
        latex={expression}
        onChange={(mathField) => this.handleChangeExpression(mathField.latex())}
      />
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div
        onKeyPress={this.onKeyPress}
        className={classNames(sasStyles.variable, className)}
      >
        {this.renderTag()}
        <p className={sasStyles.item}>
          =
        </p>
        {this.renderVariable()}
      </div>
    );
  }
}

VariableTextBox.propTypes = {
  variable: PropTypes.object,
  className: PropTypes.string,
  onContentChange: PropTypes.func
};

export default VariableTextBox;
