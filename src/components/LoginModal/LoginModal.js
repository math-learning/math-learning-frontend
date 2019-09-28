import React from 'react';
import ReactDOM from 'react-dom';
import { TextField, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';

import styles from './LoginModal.module.sass';

const RenderModal = () => (
  <div className={styles.modal}>
    <GoogleLogin
      className={styles.button}
      clientId="830601201956-ggqc86gjm10ha6g6tbdmorh48cd1jdod.apps.googleusercontent.com"
      buttonText="Log in con Google"
      onSuccess={(s) => console.log('Success', s)}
      onFailure={(e) => console.log('Success', e)}
    />
    <p className={styles.divider}>
      ó
    </p>
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
      onClick={() => {}}
      size="large"
      className={styles.createAccount}
    >
      Crear cuenta
    </Button>
  </div>
);




export default function SimpleModal() {
  ReactDOM.render(
    <RenderModal />,
    document.getElementById('modal')
  )
  // ReactDOM.render(
    // <GoogleLogin
    //   clientId="830601201956-ggqc86gjm10ha6g6tbdmorh48cd1jdod.apps.googleusercontent.com"
    //   buttonText="Login"
    //   onSuccess={(s) => console.log('Success', s)}
    //   onFailure={(e) => console.log('Success', e)}
    // />,
  //   document.getElementById('modal'),
  // );
}

// HlSHKW6Wh1KPxu1xcw3tCTC1


