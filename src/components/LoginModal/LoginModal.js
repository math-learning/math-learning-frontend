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
    this.onClickSignUp = this.onClickSignUp.bind(this);
  }

  onClickSignUp = () => {
    const { onSignUp } = this.props;

    onSignUp();
  };

  render() {
    const {
      googleClientId, onClose, onLogin
    } = this.props;

    return (
      <Modal onClose={onClose}>
        <div className={styles.modal}>
          <GoogleLogin
            className={styles.button}
            clientId={googleClientId}
            buttonText="Log in con Google"
            onSuccess={(result) => onLogin(result)}
            onFailure={(e) => console.log('TODO: error', e)}
          />
          <p className={styles.divider}>ó</p>
          <TextField
            startAd
            id="signup-name"
            label="Nombre completo"
            className={styles.name}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <FormControl className={styles.rol} component="fieldset">
            <FormLabel className={styles.rolType} component="legend">Tipo de usuario</FormLabel>
            <RadioGroup className={styles.radioGroup} aria-label="position" name="position" onChange={(a) => console.log('Success', a)} row>
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

          <Button
            onClick={this.onClickSignUp}
            size="large"
            className={styles.createAccount}
          >
            Crear cuenta
          </Button>
        </div>
      </Modal>
    );
  }
}

export default LoginModal;
