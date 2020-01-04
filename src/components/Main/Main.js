import React, { Component } from 'react';
import SignUpButton from '../Button/SignUpButton';
import Footer from '../Footer';

import styles from './Main.module.sass';

class Main extends Component {
  footer = () => (
    <p>
        Pricing ⋅ Contact ⋅ Blog ⋅ Docs ⋅ Terms and Privacy ⋅ Public GitHub
      <br />
        Copyright © Pivit Inc. 2019. All Rights Reserved
    </p>
  )

  render() {
    const { onSignUp } = this.props;

    return (
      <div className={styles.content}>
        <div className={styles.imageContent}>
          <div className={styles.imageText}>
            <p id="main-content" className={styles.imageContentText}>
              Aprender matemática
              <br />
              nunca fue tan fácil ...
            </p>
            <SignUpButton onClick={onSignUp} size="large" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
