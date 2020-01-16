import { Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded';
import React, { Component } from 'react';

import LinkListItemWithIcon from '../../LinkListItemWithIcon/LinkListItemWithIcon';
import styles from './DrawerItems.module.sass';

export default class DrawerItems extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { children } = this.props;

    return (
      <List>

        <div className={styles.divider}>
          <Divider variant="middle" />
        </div>

        <LinkListItemWithIcon
          to={{ pathname: '/courses' }}
          text="Cursos"
          icon={(<CollectionsBookmarkRoundedIcon className={styles.tcGreen} />)}
        />

        <LinkListItemWithIcon
          to={{ pathname: '/search-courses' }}
          text="Buscar Cursos"
          icon={(<CollectionsBookmarkRoundedIcon className={styles.tcBlue} />)}
        />

        {children}
      </List>
    );
  }
}
