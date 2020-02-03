import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import MathText from '../../../MathText';
import styles from './SymbolButton.module.sass';

export default class SymbolButton extends Component {
  onClickMathFormula = () => {
    const { symbol, onClick } = this.props;

    onClick(symbol);
  }

  render = () => {
    const { symbol } = this.props;

    return (
      <Button onClick={this.onClickMathFormula} size="small" variant="contained" className={styles.mathExpression}>
        <MathText
          content={symbol.label}
          className={styles.singleMathText}
        />
      </Button>
    );
  };
}
