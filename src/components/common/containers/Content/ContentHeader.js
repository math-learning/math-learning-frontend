import React from 'react';
import styles from './ContentHeader.module.sass';

export default function ContentHeader(props) {
  const { children } = props;
  return (
    <div className={styles.contentHeader}>
      {children}
    </div>
  );
}

