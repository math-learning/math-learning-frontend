import React from 'react';
import { ListItem, Typography, ListItemText } from '@material-ui/core';
import styles from './LeftPanelLink.module.sass';

export default function LeftPanelLink(props) {
  const { onClick, text } = props;

  return (
    <ListItem button onClick={onClick}>
      <ListItemText className={styles.tcGray1}>
        <Typography className={styles.secondaryText}>{text}</Typography>
      </ListItemText>
    </ListItem>
  );
}
