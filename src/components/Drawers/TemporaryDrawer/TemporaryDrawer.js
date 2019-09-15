import React, { Component, Fragment } from 'react';
import Drawer from '@material-ui/core/Drawer';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerItems from '../DrawerItems';
import ProfessorItems from '../ProfessorItems';

import styles from './TemporaryDrawer.module.sass';

export default class TemporaryDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = { opened: false };
  }

  toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ opened: open });
  };

  render() {
    const { opened } = this.state;

    return (
      <Fragment>
        <IconButton onClick={this.toggleDrawer(true).bind(this)} edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Drawer open={opened} onClose={this.toggleDrawer(false).bind(this)}>
          <div
            className={styles.list}
            role="presentation"
            onClick={this.toggleDrawer(false).bind(this)}
            onKeyDown={this.toggleDrawer(false).bind(this)}
          >
            {
              this.props.children
            }
          </div>
        </Drawer>
      </Fragment>
    );
  }
}

