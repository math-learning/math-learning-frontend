import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../../App.module.sass';

// TODO: Remove eslint-disable
export default class LinkListItemWithIcon extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {
      path, text, icon, key
    } = this.props;
    return (
      <Link className={styles.linkWithoutStyles} to={{ pathname: path }}>
        <ListItem button key={key}>
          <ListItemIcon>
            {' '}
            {icon}
            {' '}
          </ListItemIcon>
          <ListItemText primary={text} className={styles.textCenter} />
        </ListItem>
      </Link>
    );
  }
}
