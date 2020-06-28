import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import styles from './ProgressBar.module.sass';

export default function ProgressBar(props) {
  const { isVisible } = props;
  const visible = isVisible ? '' : styles.notVisible;
  const className = `${styles.progress} ${visible}`;

  return (
    <div className={className}>
      <div className={styles.spinner}>
        <CircularProgress />
      </div>
    </div>
  );
}
