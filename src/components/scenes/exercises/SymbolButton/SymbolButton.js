import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import MathText from '../../../MathText';
import styles from './SymbolButton.module.sass';

export default class SymbolButton extends Component {
  onClickMathFormula = () => {
    const { content, onClick } = this.props;

    onClick(content);
  }

  render = () => {
    const { content } = this.props;

    return (
      <Button onClick={this.onClickMathFormula} size="small" variant="contained" className={styles.mathExpression}>
        <MathText
          content={content}
          className={styles.singleMathText}
        />
      </Button>
    );
  };
}
