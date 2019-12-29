import React from 'react';
import Grid from '@material-ui/core/Grid';
import { List } from '@material-ui/core';
import styles from './LeftPanel.module.sass';

export default function LeftPanel(props) {
  const { children } = props;
  return (
    <Grid className={styles.leftPanel} item xs={12} sm={3} md={2}>
      <List>
        {children}
      </List>
    </Grid>
  );
}
