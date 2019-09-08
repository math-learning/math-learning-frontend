import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import styles from './ProgressBar.module.sass';

export default function ProgressBar(props) {
  // TODO: refactor
  const { isVisible } = props;
  let clazz = styles.progress;
  const visible = isVisible ? '' : styles.notVisible;
  clazz += ` ${visible}`;

  return (
    <div className={clazz}>
      <div className={styles.spinner}>
        <CircularProgress />
      </div>
    </div>
  );
}
