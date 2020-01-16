import { Component } from 'react';

/* eslint-disable react/no-unused-state */
export default class Editable extends Component {
  constructor(props, initialValue) {
    super(props);

    this.state = {
      isEditing: false,
      value: initialValue,
      valueBeingEdited: initialValue
    };
  }

  toggleEditing = () => {
    const { isEditing } = this.state;
    this.setState({ isEditing: !isEditing });
  }

  valueChanged = (onChangeValue = () => {}) => {
    const { valueBeingEdited, isEditing } = this.state;
    const { isEditable } = this.props;

    if (isEditable) {
      onChangeValue(valueBeingEdited);
      this.setState({ value: valueBeingEdited, isEditing: !isEditing });
    }
  }

  handleTextFieldChange = (e) => {
    this.setState({ valueBeingEdited: e.target.value });
  }
}
