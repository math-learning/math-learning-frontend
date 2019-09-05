import React, { Component } from 'react';
import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import { Divider, ListItemAvatar, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './DrawerItems.module.sass'


export class DrawerItems extends Component {

  render() {
    return (

      <List>
        <div className={styles.profileAvatar}>
          <Link className={styles.linkWithoutStyles} to={{pathname: "/profile"}}>
            <ListItem button key={"Account"} >
              <ListItemAvatar>
                <Avatar>
                  <AccountBoxIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Nombre"} secondary="Ver Perfil" />
            </ListItem>
          </Link>
        </div>

        <div className={styles.divider}>
          <Divider variant="middle" />
        </div>
        <Link className={styles.linkWithoutStyles} to={{pathname: '/courses'}}>
          <ListItem button key={"Courses"}>

            <ListItemIcon> <CollectionsBookmarkRoundedIcon color="primary" /> </ListItemIcon>
            <ListItemText primary={"Mis Cursos"} color="inherit" />

          </ListItem>
        </Link>

        {this.props.children}

      </List>

    );
  }

}