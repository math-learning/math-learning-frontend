import React, { Component } from 'react';
import {
  TextField, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel
} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';
import Modal from '../Modal';

import styles from './LoginModal.module.sass';

class LoginModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      rol: null,
      createAccountDisabled: true
    };
    this.onClickSignUp = this.onClickSignUp.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickLogin = (googleUserProfile) => {
    const { onGoogleLogin } = this.props;

    onGoogleLogin(googleUserProfile);
  };

  onClickSignUp = (googleUserProfile) => {
    const { onGoogleSignUp } = this.props;
    const { name, rol } = this.state;

    onGoogleSignUp(googleUserProfile, { name, rol });
  };

  onChangeName = (event) => {
    const { rol } = this.state;
    const newName = event.target.value;
    const createAccountDisabled = !newName || !rol;

    this.setState({ name: newName, createAccountDisabled });
  };

  onChangeRol = (event) => {
    const { name } = this.state;
    const newRol = event.target.value;
    const createAccountDisabled = !name || !newRol;

    this.setState({ rol: newRol, createAccountDisabled });
  };

  render() {
    const {
      googleClientId, onClose
    } = this.props;
    const { createAccountDisabled } = this.state;

    return (
      <Modal className={styles.modal} onClose={onClose}>
        <GoogleLogin
          className={styles.button}
          clientId={googleClientId}
          buttonText="Log in con Google"
          onSuccess={(result) => this.onClickLogin(result)}
        />
        <p className={styles.divider}>ó</p>
        <TextField
          id="signup-name"
          label="Nombre completo"
          onChange={this.onChangeName}
          className={styles.name}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <FormControl className={styles.rol} component="fieldset">
          <FormLabel className={styles.rolType} component="legend">Tipo de usuario</FormLabel>
          <RadioGroup className={styles.radioGroup} aria-label="position" name="position" onChange={this.onChangeRol} row>
            <FormControlLabel
              className={styles.radioButton}
              value="student"
              control={<Radio color="primary" />}
              label="Estudiante"
              labelPlacement="bottom"
            />
            <FormControlLabel
              className={styles.radioButton}
              value="professor"
              control={<Radio color="primary" />}
              label="Profesor"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>

        <GoogleLogin
          clientId={googleClientId}
          onSuccess={this.onClickSignUp}
          render={(renderProps) => (
            <Button
              onClick={renderProps.onClick}
              size="large"
              disabled={createAccountDisabled || renderProps.disabled}
              className={styles.createAccount}
            >
              Crear cuenta
            </Button>
          )}
        />
      </Modal>
    );
  }
}

export default LoginModal;
