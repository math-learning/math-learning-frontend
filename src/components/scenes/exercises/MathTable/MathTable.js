import React, { Component } from 'react';
import ColapseIcon from '@material-ui/icons/ChevronLeft';
import ExpandIcon from '@material-ui/icons/ChevronRight';
import { Grid, FormControlLabel, Switch } from '@material-ui/core';
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
  { label: '*', value: '*', latexValue: '\\cdot' },
  { label: '/', value: '/', latexValue: '\\frac{ }{ }' },
  { label: '(', latexValue: '(' },
  { label: ')', latexValue: ')' },
  { label: '()', value: '(', latexValue: '()' },

  { label: 'a^{()}', value: '^' },
  { label: '\\sqrt{()}', value: '\\sqrt(', latexValue: '\\sqrt {}' },

  { label: 'x', value: 'x' },
  { label: 'x^{a}', value: 'x^' },
  { label: '\\sqrt{x}', latexValue: '\\sqrt x' },

  { label: 'sen', value: 'sin' },
  { label: 'cos', value: 'cos' },
  { label: 'tg', value: 'tan' },
  { label: 'e^x', value: 'e^x' },
  { label: '\\log_2 x', latexValue: '\\log_2 x' },
  { label: '\\ln{x}', latexValue: '\\ln x' },

  { label: 'dx', value: 'dx' },
  { label: '\\frac{d()}{dx}', value: 'd()/dx', latexValue: '\\frac{d()}{dx}' },
  { label: '\\int dx', latexValue: '(\\int_{\\ }^{\\ }\\ dx)' }, // TODO: Mathquill issue: https://github.com/mathquill/mathquill/issues/784

  { label: '\\log_b a', latexValue: '\\log_{} {}' },
  { label: 'a^b', latexValue: '{}^{}' },
  { label: '\\sqrt[a]{b}', latexValue: '\\sqrt[]{}' }
];

export default class MathTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isColapsed: false,
      latexModeOn: false
    };
  }

  handleLatexMode = () => {
    const { onChangeMode } = this.props;
    const { latexModeOn } = this.state;

    this.setState({ latexModeOn: !latexModeOn });
    onChangeMode({ latexModeOn: !latexModeOn });
  }

  handleColapse = () => {
    this.setState({ isColapsed: true });
  }

  handleExpand = () => {
    this.setState({ isColapsed: false });
  }

  renderColapseHeader = () => {
    const { isColapsed } = this.state;
    const { hideColapse = true } = this.props;

    if (hideColapse) {
      return null;
    }

    return (
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
    );
  }

  render = () => {
    const { onClickSymbol } = this.props;
    const { latexModeOn } = this.state;

    return (
      <div className={styles.mathTable}>
        {this.renderColapseHeader()}

        <FormControlLabel
          className={styles.latexSwitch}
          label="Modo Latex"
          control={
            <Switch size="small" checked={latexModeOn} onChange={this.handleLatexMode} color="primary" />
          }
        />
        <Grid container spacing={1} className={styles.mathTableActions}>
          {symbols.map((symbol) => (
            <Grid item key={symbol.label}>
              <SymbolButton symbol={symbol} onClick={onClickSymbol} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };
}
