import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './ProgressBar.module.sass';

class ProgressBar extends Component {
  // TODO: refactor
  render() {
    const { isVisible } = this.props;
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
}

export default ProgressBar;
