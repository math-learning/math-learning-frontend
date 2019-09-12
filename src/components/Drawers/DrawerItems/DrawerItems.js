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

export default class DrawerItems extends Component {
  render() {
    const { children, profile } = this.props;

    return (
      <List>
        <div className={styles.profileAvatar}>
          <Link className={styles.linkWithoutStyles} to={{ pathname: '/profile' }}>
            <ListItem button key="Account">
              <ListItemAvatar>
                <Avatar>
                  {
                    profile.photo ?
                      <img src={profile.photo} /> : <AccountBoxIcon />
                  }

                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={profile.name} secondary="Ver Perfil" />
            </ListItem>
          </Link>
        </div>

        <div className={styles.divider}>
          <Divider variant="middle" />
        </div>
        <Link className={styles.linkWithoutStyles} to={{ pathname: '/courses' }}>
          <ListItem button key="Courses">

            <ListItemIcon>
              {' '}
              <CollectionsBookmarkRoundedIcon className={styles.tcGreen} />
              {' '}
            </ListItemIcon>
            <ListItemText primary="Mis Cursos" />

          </ListItem>
        </Link>

        <Link className={styles.linkWithoutStyles} to={{ pathname: '/search-courses' }}>
          <ListItem button key="Search Courses">

            <ListItemIcon>
              {' '}
              <CollectionsBookmarkRoundedIcon className={styles.tcBlue} />
              {' '}
            </ListItemIcon>
            <ListItemText primary="Buscar Cursos" />

          </ListItem>
        </Link>

        {children}
      </List>
    );
  }

}
