import React from 'react';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Editable from '../../abstract/Editable/Editable';

export default class EditableText extends Editable {
  constructor(props) {
    super(props, props.text);
  }

  handleUpdateValue = () => {
    const { valueBeingEdited } = this.state;
    const { onSave } = this.props;

    if (valueBeingEdited) {
      this.valueChanged();
      onSave(valueBeingEdited);
    }
  }

  handlePressKeyDone = (event) => {
    if (event.which === 13) {
      this.handleUpdateValue();
    }
  }

  render() {
    const {
      textFieldClassNames,
      typographyClassNames,
      textFieldSettings,
      classNames,
      variant,
      text,
      isEditable,
    } = this.props;
    const { isEditing } = this.state;

    let textComponent;
    let iconComponent;

    const fieldSettings = textFieldSettings || {};

    if (isEditing) {
      textComponent = (
        <TextField
          multiline={fieldSettings.multiline || false}
          fullWidth={fieldSettings.fullWidth || false}
          className={textFieldClassNames}
          defaultValue={text}
          rowsMax="3"
          onKeyPress={this.handlePressKeyDone}
          onChange={this.handleTextFieldChange}
        />
      );
      iconComponent = (
        <IconButton onClick={this.handleUpdateValue}>
          <DoneIcon fontSize="small" />
        </IconButton>
      );
    } else {
      textComponent = (
        <Typography
          variant={variant || 'body1'}
          className={typographyClassNames}
        >
          {text}
        </Typography>
      );
      iconComponent = (
        <IconButton onClick={this.toggleEditing}>
          <EditIcon fontSize="small" />
        </IconButton>
      );
    }

    return (
      <div className={classNames}>
        {textComponent}
        {isEditable && iconComponent}
      </div>
    );
  }
}
