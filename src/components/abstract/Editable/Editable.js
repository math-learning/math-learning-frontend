import { Component } from 'react';

export default class Editable extends Component {
  constructor(props, initialValue) {
    super(props);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.valueChanged = this.valueChanged.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.state = { editing: false, value: initialValue, valueBeingEdited: initialValue };
  }

  toggleEditing() {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  valueChanged(onChangeValue) {
    return () => {
      const { valueBeingEdited, value, editing } = this.state;
      const { dontUpdate } = this.props;
      let newValue = valueBeingEdited;
      onChangeValue(newValue);
      if (dontUpdate) {
        newValue = value;
      }
      this.setState({ value: newValue, editing: !editing });
    };
  }

  handleTextFieldChange(e) {
    this.setState({
      valueBeingEdited: e.target.value
    });
  }
}
