import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import MathTextBox from '../MathTextBox';
import VariableTextBox from '../VariableTextBox';

// TODO: unify
import styles from '../MathTextBox/MathTextBox.css'; // eslint-disable-line no-unused-vars
import sasStyles from './MathTextBoxWithVariables.module.sass';

const defaultVariable = { tag: 'u(x)', expression: '' };

class MathTextBoxWithVariables extends Component {
  constructor(props) {
    super(props);

    this.expressionRef = React.createRef();
  }

  handleExpressionChange = (expression) => {
    const { onContentChange, content } = this.props;

    onContentChange({ ...content, expression });
    // TODO: Quizás debería directamente manejar el estado el? creo que no...
  }

  handleVariableChange = (index, varWithNewContent) => {
    const { onContentChange, content } = this.props;
    const newVariables = content.variables.map((variable, varIndex) => {
      if (index === varIndex) {
        return varWithNewContent;
      }
      return variable;
    });

    onContentChange({ ...content, variables: newVariables });
  }

  handleCreateNewVariable = () => {
    const { content, onContentChange } = this.props;
    // TODO: quizas esto deberia hacerlo directo con un .container.js

    onContentChange({
      ...content,
      variables: [...content.variables, defaultVariable]
    });
  }

  handleDeleteVariable = () => {
    const { content, onContentChange } = this.props;
    // TODO: quizas esto deberia hacerlo directo con un .container.js

    onContentChange({
      ...content,
      variables: content.variables.slice(0, -1)
    });
  }

  insertateAMEO = (symbol) => {
    console.log('INSERTAME LA VALUE DONDE CORRESPONDA AMEO');
    if (this.expressionRef.current) {
      this.expressionRef.current.insertateAMEO(symbol);
    }
  }

  renderExpressionBox = () => {
    const { content: { expression }, latexMode, onEnter } = this.props;

    return (
      <MathTextBox
        id="expression-math-box"
        ref={this.expressionRef}
        content={expression}
        onContentChange={this.handleExpressionChange}
        onEnter={onEnter}
        latexMode={latexMode}
      />
    );
  }

  renderVariablesBox = () => {
    const { content: { variables = [] }, latexMode } = this.props;

    return (
      <div className={sasStyles.variableContainer}>
        {(variables).map((variable, index) => (
          <VariableTextBox
            id={`variable-math-box-${index}`}
            variable={variable}
            className={sasStyles.variableTextBox}
            onContentChange={(variableContent) => this.handleVariableChange(index, variableContent)}
            latexMode={latexMode}
          />
        ))}
        {
          !!variables.length && (
            <DeleteIcon
              className={classNames(sasStyles.varIcon, sasStyles.removeVarIcon)}
              onClick={this.handleDeleteVariable}
            />
          )
        }
        <AddIcon
          className={classNames(sasStyles.varIcon, sasStyles.addVarIcon)}
          color="primary"
          onClick={this.handleCreateNewVariable}
        />
      </div>
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div
        onClick={this.onClick}
        onKeyPress={this.onKeyPress}
        className={classNames(sasStyles.container, className)}
      >
        {this.renderExpressionBox()}
        {this.renderVariablesBox()}
      </div>
    );
  }
}

MathTextBoxWithVariables.propTypes = {
  content: PropTypes.object,
  className: PropTypes.string,
  onContentChange: PropTypes.func,
  onEnter: PropTypes.func,
};

export default MathTextBoxWithVariables;
