import Drawer from '@material-ui/core/Drawer';
import React, { Component } from 'react';

import styles from './ClippedDrawerUnderAppBar.module.sass';

// TODO: Remove eslint-disable
export default class ClippedDrawerUnderAppBar extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { children } = this.props;

    return (
      <Drawer
        className={styles.drawer}
        variant="permanent"
        classes={{
          paper: styles.drawerPaper,
        }}
      >
        {
          children
        }
      </Drawer>
    );
  }
}
