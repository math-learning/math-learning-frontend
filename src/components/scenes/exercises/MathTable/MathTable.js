import React, { Component } from 'react';
import ColapseIcon from '@material-ui/icons/ChevronLeft';
import ExpandIcon from '@material-ui/icons/ChevronRight';
import { Grid } from '@material-ui/core';

import SymbolButton from '../SymbolButton';
import styles from './MathTable.module.sass';

const mathTable = [
  { label: '1' },
  { label: '2' },
  { label: '3' },
  { label: '4' },
  { label: '5' },
  { label: '6' },
  { label: '7' },
  { label: '8' },
  { label: '9' },

  { label: '+' },
  { label: '-' },
  { label: '*' },
  { label: '/' },

  { label: '(' },
  { label: ')' },
  { label: '()' },

  { label: 'x' },
  { label: 'x^{a}' },
  { label: '\\sqrt{x}' },

  { label: 'sen' },
  { label: 'cos' },
  { label: 'tg' },
  { label: 'e^x' },
  { label: '\\log_2 x' },
  { label: '\\ln{x}' },

  { label: 'dx' },
  { label: '\\frac{d()}{dx}' },

  { label: '\\log_b a' },

  { label: 'a^b' },
  { label: '\\sqrt[a]{b}' },
  { label: '\\pi' }
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
            {mathTable.map((i) => (
              <Grid item key={i.label}>
                <SymbolButton content={i.label} onClick={onClickSymbol} />
              </Grid>
            ))}
          </Grid>
        ) : null}
      </div>
    );
  };
}
