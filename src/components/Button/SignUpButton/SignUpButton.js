import React, { Component } from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

import styles from './SignUpButton.module.sass';

class SignUpButton extends Component {
  render() {
    const { size, className, onClick } = this.props;

    return (
      <div className={classNames(styles.button, className)}>
        <Button
          onClick={onClick}
          size={size || 'large'}
        >
          Sign up
        </Button>
      </div>
    );
  }
}

export default SignUpButton;
