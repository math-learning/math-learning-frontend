import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react';
import styles from './TemporaryDrawer.module.sass';

// TODO: Remove eslint-disable
/* eslint-disable react/jsx-no-bind */
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
    const { children } = this.props;

    return (
      <React.Fragment>
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
            {children}
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

