import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import styles from '../../../CoursePage/CoursePage.module.sass';

export default class LeftPanelTitle extends Component {
  render() {
    const { text, className } = this.props;

    return (
      <div>
        <Typography className={clsx(styles.leftPanelTitle, className)}>
          {text}
        </Typography>
      </div>
    );
  }
}
