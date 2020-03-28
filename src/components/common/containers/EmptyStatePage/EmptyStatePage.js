import React from 'react';
import { Typography } from '@material-ui/core';
import EmptyIcon from '@material-ui/icons/AllInclusive';
import styles from './EmptyStatePage.module.sass';

export default function EmptyStatePage(props) {
  const { title, subtitle } = props;

  return (
    <div className={styles.emptyStateContainer}>
      <EmptyIcon fontSize="inherit" className={styles.emptyIcon} />
      <Typography className={styles.primaryText} variant="h5">{title}</Typography>
      <Typography className={styles.secondaryText} variant="h6" color="textSecondary">{subtitle}</Typography>
    </div>
  );
}
