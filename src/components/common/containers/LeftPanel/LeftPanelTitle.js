import React from 'react';
import { Typography, ListItemText } from '@material-ui/core';
import classnames from 'classnames';
import styles from './LeftPanelTitle.module.sass';

export default function LeftPanelTitle(props) {
  const { text, className } = props;

  return (
    <ListItemText>
      <Typography className={classnames(styles.title, className)}>{text}</Typography>
    </ListItemText>
  );
}
