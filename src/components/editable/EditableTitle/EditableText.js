import React from 'react';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import { Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import classnames from 'classnames';
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
          className={classnames(textFieldClassNames)}
          defaultValue={text}
          onChange={this.handleTextFieldChange}
        />
      );

      iconComponent = (
        <IconButton className={classnames(typographyClassNames)}>
          <DoneIcon onClick={this.valueChanged(onSave)} />
        </IconButton>
      );
    } else {
      textComponent = (
        <Typography
          variant={variant || 'body1'}
          className={classnames(typographyClassNames)}
        >
          {text}
        </Typography>
      );

      iconComponent = (
        <IconButton className={classnames(typographyClassNames)}>
          <EditIcon onClick={this.toggleEditing} />
        </IconButton>
      );
    }

    return (
      <div className={classnames(classNames)}>
        {textComponent}
        {iconComponent}
      </div>
    );
  }
}
