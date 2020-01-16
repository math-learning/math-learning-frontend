import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import styles from './MoreVertOptions.module.sass';

export default class MoreVertOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.wrapOnClick.bind(this);
  }

  wrapOnClick(onClickHandler) {
    return () => {
      onClickHandler();
      this.closeMenu();
    };
  }

  closeMenu() {
    this.setState({ anchorEl: null });
  }

  showMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  render() {
    const { options } = this.props;
    const { anchorEl } = this.state;
    return (
      <React.Fragment>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.showMenu}
          className={styles.iconButton}
          edge="end"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.closeMenu}
        >
          {options && options.length && options.map((option) => (
            <MenuItem key={option.text} onClick={this.wrapOnClick(option.onClick)}>
              {option.text}
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }
}
