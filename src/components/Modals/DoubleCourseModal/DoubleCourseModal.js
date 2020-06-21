import React, { Component } from 'react';
import { TextField, Typography, Button } from '@material-ui/core';

import Modal from '../Modal';
import styles from './DoubleCourseModal.module.sass';

class CreateCourseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      password: null,
      description: null,
      createDisabled: true
    };
  }

  onDoubleCourse = () => {
    const { onDoubleCourse } = this.props;
    const {
      name,
      password,
      description
    } = this.state;

    onDoubleCourse({
      name,
      password,
      description
    });
  };

  onChangeName = (event) => {
    const { description } = this.state;
    const newName = event.target.value;

    this.setState({ name: newName });
    this.setState({ createDisabled: !newName || !description });
  };

  onChangeDescription = (event) => {
    const { name } = this.state;
    const newDescription = event.target.value;

    this.setState({ description: newDescription });
    this.setState({ createDisabled: !newDescription || !name });
  };

  onChangePassword = (event) => {
    const newPassword = event.target.value;

    this.setState({ password: newPassword });
  };

  render() {
    const { onClose } = this.props;
    const { createDisabled } = this.state;

    return (
      <Modal className={styles.modal} onClose={onClose}>
        <Typography id="double-label" color="textPrimary" variant="h4" component="h1">
          Duplicación del curso actual
        </Typography>

        <TextField
          id="course-name"
          label="Nombre del nuevo curso"
          margin="normal"
          onChange={this.onChangeName}
          className={styles.name}
          fullWidth
          multiline
          variant="outlined"
        />

        <TextField
          id="course-description"
          label="Descripción del nuevo curso"
          onChange={this.onChangeDescription}
          className={styles.textField}
          fullWidth
          multiline
          rowsMax="4"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="course-password"
          label="Contraseña del nuevo curso (opcional)"
          onChange={this.onChangePassword}
          className={styles.textField}
          fullWidth
          multiline
          variant="outlined"
        />

        <Button
          color="primary"
          variant="contained"
          id="double-button"
          onClick={this.onDoubleCourse}
          size="large"
          disabled={createDisabled}
          className={styles.button}
        >
          Duplicar curso
        </Button>
      </Modal>
    );
  }
}

export default CreateCourseModal;
