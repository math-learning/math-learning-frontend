import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

import styles from './SignUpButton.module.sass';

export default function SignUpButton(props) {
  const { size, className, onClick } = props;

  return (
    <Button
      onClick={onClick}
      size={size || 'large'}
      className={classNames(styles.button, className)}
    >
      Sign up
    </Button>
  );
}
