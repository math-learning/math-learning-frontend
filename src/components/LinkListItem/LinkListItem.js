import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import styles from '../../App.module.sass';
import EditableText from '../common/containers/LeftPanel/EditableTextListItem';

export default class LinkListItem extends Component {
  render() {
    const {
      path, text, icon, key
    } = this.props;

    let iconComponent = '';

    if (icon) {
      iconComponent = (
        <ListItemIcon>
          {' '}
          {` ${icon} `}
          {' '}
        </ListItemIcon>
      );
    }

    let listItem;

    if (text.editable) {
      listItem = <EditableText text={text} />;
    } else {
      listItem = (
        <>
          {iconComponent}
          <ListItemText primary={text.content} />
        </>
      );
    }

    return (
      <>
        <Link className={styles.linkWithoutStyles} to={{ pathname: path }}>
          { listItem }
        </Link>
      </>

    );
  }
}
