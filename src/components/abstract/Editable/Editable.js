import React, { Component } from 'react';

export default class Editable extends Component {
  constructor(props, initialValue) {
    super(props);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.valueChanged = this.valueChanged.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this.state = { editing: false, value: initialValue, valueBeingEdited: initialValue };
  }

  toggleEditing() {
    this.setState({ ...this.state, editing: !this.state.editing });
  }

  valueChanged(onChangeValue) {
    return () => {
      let newValue = this.state.valueBeingEdited;
      onChangeValue(newValue);
      if (this.props.dontUpdate) {
        newValue = this.state.value;
      }
      this.setState({ ...this.state, value: newValue, editing: !this.state.editing });
    };
  }

  _handleTextFieldChange(e) {
    this.setState({
      valueBeingEdited: e.target.value
    });
  }
}
