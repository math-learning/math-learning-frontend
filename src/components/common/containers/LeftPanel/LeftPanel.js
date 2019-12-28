import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  Divider, List, ListItem, Typography
} from '@material-ui/core';
import LeftPanelElements from './LeftPanelElements';
import styles from './LeftPanel.module.sass';

export default class LeftPanel extends Component {
  render() {
    return (
      <Grid className={styles.leftPanel} item xs={12} sm={3} md={2}>
        <List>
          {this.props.children}
        </List>
      </Grid>
    );
  }
}
