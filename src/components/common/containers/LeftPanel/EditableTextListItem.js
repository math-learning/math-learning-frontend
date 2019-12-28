import React, { Component } from 'react';
import { ListItem, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditableText from '../../../abstract/Editable/Editable';
import styles from '../../../../App.module.sass';

export default class EditableTextListItem extends EditableText {
  constructor(props) {
    super(props, props.text);
  }

  render() {
    let text; let
      icon;
    const { onChangeValue, onListItemClick } = this.props;
    if (this.state.editing) {
      text = (<TextField className={styles.tcGray1} defaultValue={this.props.text} onChange={this._handleTextFieldChange} />);
      icon = (<DoneIcon className={styles.tcGray1} onClick={this.valueChanged(onChangeValue)} />);
    } else {
      text = (<Typography className={styles.tcGray1}>{this.state.value}</Typography>);
      icon = (<EditIcon className={styles.tcGray1} onClick={this.toggleEditing} />);
    }

    const itemClicked = !this.state.editing ? onListItemClick : void (0);

    return (
      <ListItem button={!this.state.editing} onClick={itemClicked}>
        <ListItemText>
          {text}
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton edge="end">
            {icon}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
