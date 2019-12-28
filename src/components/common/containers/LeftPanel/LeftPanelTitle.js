import React from 'react';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import styles from '../../../CoursePage/CoursePage.module.sass';

export default function LeftPanelTitle(props) {
  const { text, className } = props;

  return (
    <div>
      <Typography className={clsx(styles.leftPanelTitle, className)}>
        {text}
      </Typography>
    </div>
  );
}
