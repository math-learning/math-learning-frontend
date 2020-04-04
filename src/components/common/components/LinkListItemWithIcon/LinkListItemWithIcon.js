import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../../../App.module.sass';

export default function LinkListItemWithIcon(props) {
  const {
    path, text, icon
  } = props;

  return (
    <Link className={styles.linkWithoutStyles} to={{ pathname: path }}>
      <ListItem button>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} className={styles.textCenter} />
      </ListItem>
    </Link>
  );
}
