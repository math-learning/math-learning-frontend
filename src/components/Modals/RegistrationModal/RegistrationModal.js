import React, { Component } from 'react';
import { TextField, Typography, Button } from '@material-ui/core';

import Modal from '../Modal';
import styles from './RegistrationModal.module.sass';

class RegistrationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: null
    };
  }

  onJoinCourse = () => {
    const { onJoinCourse, course, profile } = this.props;
    const { password } = this.state;

    onJoinCourse({
      course,
      password,
      userId: profile.userId,
      role: 'student'
    });
  };

  onChangePassword = (event) => {
    const newPassword = event.target.value;

    this.setState({ password: newPassword });
  };

  render() {
    const { course, onClose } = this.props;

    return (
      <Modal className={styles.modal} onClose={onClose}>
        <Typography
          id="title"
          color="textPrimary"
          variant="h4"
          component="h1"
          className={styles.title}
        >
          Desea matricularse en el curso ?
          <br />
          {course.name}
        </Typography>

        <TextField
          id="course-password"
          label="Ingrese la contraseña del curso"
          onChange={this.onChangePassword}
          onEnter={this.onJoinCourse}
          className={styles.textField}
          fullWidth
          variant="outlined"
        />

        <div>
          <Button
            color="primary"
            variant="contained"
            id="join-button"
            onClick={this.onJoinCourse}
            size="large"
            className={styles.button}
          >
            Matricularse
          </Button>
        </div>
      </Modal>
    );
  }
}

export default RegistrationModal;
