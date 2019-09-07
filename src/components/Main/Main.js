import React, { Component } from 'react';
import Footer from '../Footer'
import SignUpButton from '../Button/SignUpButton'

import styles from './Main.module.sass';

class Main extends Component {

  footer = () => {
    return (
      <p>
        Pricing ⋅ Contact ⋅ Blog ⋅ Docs ⋅ Terms and Privacy ⋅ Public GitHub
        <br/>
        Copyright © Pivit Inc. 2019. All Rights Reserved
      </p>
    )
  }

  render() {
    return (
      <div>
        <div className={styles.content}>
          <div className={styles.imageContent}>
            <p className={styles.imageContentText}>
              Aprender matemática<br/>
              nunca fue tan fácil
            </p>
            <SignUpButton/>
          </div>
        </div>

        <div className={styles.footer}>
          <Footer node={this.footer()}/>
        </div>
      </div>)
  }
}

export default Main;
