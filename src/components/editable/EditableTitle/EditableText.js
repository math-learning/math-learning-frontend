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

  render() {
    const {
      onSave,
      textFieldClassNames,
      typographyClassNames,
      textFieldSettings,
      classNames,
      variant,
      text,
    } = this.props;
    const { editing } = this.state;
    let textComponent;
    let iconComponent;

    const fieldSettings = textFieldSettings || {};

    if (editing) {
      textComponent = (
        <TextField
          multiline={fieldSettings.multiline || false}
          fullWidth={fieldSettings.fullWidth || false}
          className={textFieldClassNames}
          defaultValue={text}
          rowsMax="3"
          onChange={this.handleTextFieldChange}
        /> // TODO: we should have the marginRight here and not in the received properties
        // TODO: we have to manage the onEnter and onBlur actions
      );

      iconComponent = (
        <IconButton onClick={this.valueChanged(onSave)}>
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
        {iconComponent}
      </div>
    );
  }
}
