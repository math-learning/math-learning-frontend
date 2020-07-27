import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import MathTextBox from '../MathTextBox';
import VariableTextBox from '../VariableTextBox';
import BootstrapTooltip from '../../../../bootstrap/Tooltip';

import sasStyles from './MathTextBoxWithVariables.module.sass';

const defaultVariable = { tag: 'u(x)', expression: '' };
const addVariablesTooltipText = 'Para aplicar por partes usar "u(x)" y "v(x)". \n Para sustitución "u" y "du"';

class MathTextBoxWithVariables extends Component {
  constructor(props) {
    super(props);

    this.expressionRef = React.createRef();
  }

  handleExpressionChange = (expression) => {
    const { onContentChange, content } = this.props;

    onContentChange({ ...content, expression });
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

  handleDeleteVariable = (index) => {
    const { content, onContentChange } = this.props;
    const newVariables = [...content.variables];
    newVariables.splice(index, 1);

    onContentChange({
      ...content,
      variables: newVariables
    });
  }

  handleCreateNewVariable = () => {
    const { content, onContentChange } = this.props;

    const newVariable = { ...defaultVariable };
    if (content.variables.length && content.variables[0].tag === 'u(x)') {
      newVariable.tag = 'v(x)';
    } else if (content.variables.length && content.variables[0].tag === 'u') {
      newVariable.tag = 'du';
    }

    onContentChange({
      ...content,
      variables: [...content.variables, newVariable]
    });
  }

  insertSymbol = (symbol) => {
    if (this.expressionRef.current) {
      this.expressionRef.current.insertSymbol(symbol);
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
    const { content: { variables = [] }, latexMode, onEnter } = this.props;

    return (
      <div className={sasStyles.variableContainer}>
        {(variables).map((variable, index) => (
          <div className={sasStyles.variable} key={`variable-math-box-${index}`}>
            <VariableTextBox
              variable={variable}
              className={sasStyles.variableTextBox}
              onContentChange={(variableContent) => this.handleVariableChange(index, variableContent)}
              onEnter={onEnter}
              latexMode={latexMode}
            />
            <DeleteIcon
              className={sasStyles.variableItem}
              onClick={() => this.handleDeleteVariable(index)}
            />
          </div>
        ))}
        <BootstrapTooltip
          title={addVariablesTooltipText}
          placement="top"
          className={sasStyles.varTooltip}
        >
          <Button
            id="add-variable"
            className={classNames(sasStyles.variableItem, sasStyles.addVarButton)}
            onClick={this.handleCreateNewVariable}
            disabled={variables.length > 1}
            variant="contained"
            color="primary"
            size="small"
          >
            + Variable
          </Button>
        </BootstrapTooltip>
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
