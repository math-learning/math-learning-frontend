import React from 'react';
import { ListItem, Typography, ListItemText } from '@material-ui/core';
import styles from './LeftPanelLink.module.sass';

export default function LeftPanelLink(props) {
  const { onClick, text } = props;

  return (
    <ListItem button onClick={onClick}>
      <ListItemText>
        <Typography>{text}</Typography>
      </ListItemText>
    </ListItem>
  );
}
