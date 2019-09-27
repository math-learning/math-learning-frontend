import React, { Component } from "react";

import { Avatar, Divider, ListItemAvatar } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import { Link } from 'react-router-dom';
import LinkListItemWithIcon from '../../LinkListItemWithIcon/LinkListItemWithIcon';
import styles from './ProfileLinkListItem.module.sass'


export default class ProfileLinkListItem extends Component {
  render() {
    const {profile} = this.props;
    return (
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
    )
  }
}