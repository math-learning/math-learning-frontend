import React, { Component } from 'react';
import SignUpButton from '../Button/SignUpButton';

import styles from './Main.module.sass';
import { Container } from '@material-ui/core';

class Main extends Component {
  footer = () => (
    <p>
        Pricing ⋅ Contact ⋅ Blog ⋅ Docs ⋅ Terms and Privacy ⋅ Public GitHub
      <br />
        Copyright © Pivit Inc. 2019. All Rights Reserved
    </p>
  )

  render() {
    const { onLogin } = this.props;

    return (
      <div className={styles.content}>
        <div className={styles.imageContent}>
          <p className={styles.imageContentText}>
            Aprender matemática
            <br />
            nunca fue tan fácil ...
          </p>
          <SignUpButton onClick={onLogin} size="large" />
        </div>
      </div>
    );
  }
}

export default Main;
