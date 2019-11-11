import { Avatar, ListItemAvatar } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileLinkListItem.module.sass';

// TODO: Remove eslint-disable
export default class ProfileLinkListItem extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { profile } = this.props;
    return (
      <div className={styles.profileAvatar}>
        <Link className={styles.linkWithoutStyles} to={{ pathname: '/profile' }}>
          <ListItem button key="Account">
            <ListItemAvatar>
              <Avatar>
                {
                    profile.photo
                      ? <img src={profile.photo} /> : <AccountBoxIcon /> // eslint-disable-line jsx-a11y/alt-text
                  }

              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={profile.name} secondary="Ver Perfil" />
          </ListItem>
        </Link>
      </div>
    );
  }
}
