import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import styles from './SignUpButton.module.sass';

class SignUpButton extends Component {
  render() {
    return (
      <div className={styles.button}>
        <Button size="large">Sign up</Button>
      </div>
    )
  }
}

export default SignUpButton;
