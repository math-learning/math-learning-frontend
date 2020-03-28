import React from 'react';
import ReturnIcon from '@material-ui/icons/ChevronLeft';
import { ListItem, Typography, ListItemText } from '@material-ui/core';
import styles from './LeftPanelLink.module.sass';

export default function LeftPanelLink(props) {
  const { onClick, text, includeBack = false } = props;

  return (
    <ListItem button onClick={onClick} className={includeBack ? styles.linkItem : ''}>
      {includeBack && <ReturnIcon />}
      <ListItemText>
        <Typography>{text}</Typography>
      </ListItemText>
    </ListItem>
  );
}
