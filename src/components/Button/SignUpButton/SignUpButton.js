import React from 'react';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';

import styles from './SignUpButton.module.sass';

export default function SignUpButton(props) {
  const { size, className, onClick } = props;

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
