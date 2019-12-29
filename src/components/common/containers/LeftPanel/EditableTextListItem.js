import React from 'react';
import classNames from 'classnames';
import { ListItem, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditableText from '../../../abstract/Editable/Editable';
import styles from '../../../../App.module.sass';

export default class EditableTextListItem extends EditableText {
  constructor(props) {
    super(props, props.text);
  }

  render() {
    const { onChangeValue, onListItemClick, text } = this.props;
    const { editing, value } = this.state;
    let textComponent;
    let iconComponent;

    if (editing) {
      textComponent = (<TextField className={styles.secondaryText} defaultValue={text} onChange={this.handleTextFieldChange} />);
      iconComponent = (<DoneIcon className={classNames(styles.secondaryIcon, styles.clickeableIcon)} onClick={this.valueChanged(onChangeValue)} />);
    } else {
      textComponent = (<Typography className={styles.secondaryText}>{value}</Typography>);
      iconComponent = (<EditIcon className={classNames(styles.secondaryIcon, styles.clickeableIcon)} onClick={this.toggleEditing} />);
    }

    const itemClicked = !this.state.editing ? onListItemClick : () => {};

    return (
      <ListItem button={!this.state.editing} onClick={itemClicked}>
        <ListItemText>
          {textComponent}
        </ListItemText>
        <ListItemSecondaryAction>
          {iconComponent}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
