import React, { Component } from 'react';
import { Avatar, Divider, ListItemAvatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import { Link } from 'react-router-dom';
import styles from './DrawerItems.module.sass';
import LinkListItemWithIcon from '../../LinkListItemWithIcon/LinkListItemWithIcon';

export default class DrawerItems extends Component {
  render() {
    const { children, profile } = this.props;

    return (
      <List>
        

        <div className={styles.divider}>
          <Divider variant="middle" />
        </div>

        <LinkListItemWithIcon to={{ pathname: '/courses' }} text="Cursos" 
          icon={(<CollectionsBookmarkRoundedIcon className={styles.tcGreen} />)}/>

        <LinkListItemWithIcon to={{ pathname: '/search-courses' }} text="Buscar Cursos" 
          icon={(<CollectionsBookmarkRoundedIcon className={styles.tcBlue} />)}/>

        {children}
      </List>
    );
  }

}
