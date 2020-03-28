import React from 'react';
import classNames from 'classnames';
import { ListItem, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Editable from '../../../../../../abstract/Editable/Editable';
import MoreVertOptions from '../../Options';
import styles from './TextListItem.module.sass';

export default class TextListItem extends Editable {
  constructor(props) {
    super(props, props.element.name);
  }

  handlePressKeyDone = (event) => {
    if (event.which === 13) {
      this.handleValueChange();
    }
  }

  handleOnBlur = () => {
    this.setState({ isEditing: false });
  }

  handleValueChange = () => {
    const { valueBeingEdited } = this.state;
    const { onUpdateElementValue, validateCanUpdate, element } = this.props;

    if (validateCanUpdate(element, valueBeingEdited)) {
      this.valueChanged();
      onUpdateElementValue(element, valueBeingEdited);
    }
  }

  handleOnDeleteElement = () => {
    const { onDeleteElement, element } = this.props;

    onDeleteElement(element);
  }

  handleOnClickElement = () => {
    const { onClickElement, element } = this.props;

    onClickElement(element);
  }

  render() {
    const { element, isEditable, className } = this.props;
    const { isEditing, value } = this.state;
    let textComponent;
    let iconComponent;

    if (isEditing) {
      textComponent = (
        <TextField
          autoFocus
          className={styles.secondaryText}
          defaultValue={element.name}
          onBlur={this.handleOnBlur}
          onChange={this.handleTextFieldChange}
          onKeyPress={this.handlePressKeyDone}
        />
      );
      iconComponent = (
        <DoneIcon
          className={classNames(styles.secondaryIcon, styles.clickeableIcon)}
          onClick={this.handleValueChange}
        />
      );
    } else {
      textComponent = (
        <Typography className={styles.secondaryText}>
          {value}
        </Typography>
      );
      iconComponent = (
        <MoreVertOptions
          options={[
            {
              text: 'Editar',
              onClick: this.toggleEditing,
            },
            {
              text: 'Eliminar',
              onClick: this.handleOnDeleteElement,
            },
          ]}
        />
      );
    }

    const itemClicked = !this.state.isEditing ? this.handleOnClickElement : () => {};

    return (
      <ListItem button={!this.state.isEditing} onClick={itemClicked} className={className}>
        <ListItemText>
          {textComponent}
        </ListItemText>
        { isEditable && (
          <ListItemSecondaryAction>
            {iconComponent}
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}
