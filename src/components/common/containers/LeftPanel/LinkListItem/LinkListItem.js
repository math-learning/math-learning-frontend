import React from 'react';
import { Link } from 'react-router-dom';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import styles from '../../../../../App.module.sass';
import EditableText from '../../../text/EditableTitle/EditableText';

export default function LinkListItem(props) {
  const {
    path, text, icon
  } = props;

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
      <React.Fragment>
        {iconComponent}
        <ListItemText primary={text.content} />
      </React.Fragment>
    );
  }

  return (
    <Link className={styles.linkWithoutStyles} to={{ pathname: path }}>
      { listItem }
    </Link>
  );
}
