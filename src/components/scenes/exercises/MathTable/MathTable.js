import React, { Component } from 'react';
import ColapseIcon from '@material-ui/icons/ChevronLeft';
import ExpandIcon from '@material-ui/icons/ChevronRight';
import { Grid } from '@material-ui/core';

import SymbolButton from '../SymbolButton';
import styles from './MathTable.module.sass';

const symbols = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },

  { label: '+', value: '+' },
  { label: '-', value: '-' },
  { label: '*', value: '*' },
  { label: '/', value: '/' },
  { label: '(', value: '(', isLatex: true },
  { label: ')', value: ')', isLatex: true },
  { label: '()', value: '(', },

  { label: 'a^{()}', value: '^' },
  { label: '\\sqrt{()}', value: '\\sqrt (' },

  { label: 'x', value: 'x' },
  { label: 'x^{a}', value: 'x^' },
  { label: '\\sqrt{x}', value: '\\sqrt x' },

  { label: 'sen', value: 'sin' },
  { label: 'cos', value: 'cos' },
  { label: 'tg', value: 'tan' },
  { label: 'e^x', value: 'e^x' },
  { label: '\\log_2 x', value: '\\log_2 x', isLatex: true },
  { label: '\\ln{x}', value: '\\ln x' },

  { label: 'dx', value: 'dx' },
  { label: '\\frac{d()}{dx}', value: 'd()/dx' },

  { label: '\\log_b a', value: '\\log_{} {}', isLatex: true },
  { label: 'a^b', value: '{}^{}', isLatex: true },
  { label: '\\sqrt[a]{b}', value: '\\sqrt[]{}', isLatex: true }
];

export default class MathTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isColapsed: true
    };
  }

  handleColapse = () => {
    this.setState({ isColapsed: true });
  }

  handleExpand = () => {
    this.setState({ isColapsed: false });
  }

  render = () => {
    const { onClickSymbol } = this.props;
    const { isColapsed } = this.state;

    return (
      <div className={styles.mathTable}>
        <div className={styles.mathTableHeader}>
          {isColapsed
            ? (
              <ExpandIcon
                className={styles.colapseIcon}
                onClick={this.handleExpand}
              />
            ) : (
              <ColapseIcon
                className={styles.colapseIcon}
                onClick={this.handleColapse}
              />
            )}
        </div>

        {!isColapsed ? (
          <Grid container spacing={1} className={styles.mathTableActions}>
            {symbols.map((symbol) => (
              <Grid item key={symbol.label}>
                <SymbolButton symbol={symbol} onClick={onClickSymbol} />
              </Grid>
            ))}
          </Grid>
        ) : null}
      </div>
    );
  };
}
