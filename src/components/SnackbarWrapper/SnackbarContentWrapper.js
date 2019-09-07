import React, { Component } from 'react';
import clsx from 'clsx';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

import IconButton from '@material-ui/core/IconButton';

import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import PropTypes from 'prop-types';
import styles from './SnackbarContentWrapper.module.sass'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

export class SnackbarContentWrapper extends Component {
    render() {
        const { className, message, onClose, variant, ...other } = this.props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(styles[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={styles.message}>
            <Icon className={clsx(styles.icon, styles.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={styles.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
  }
}
    

  SnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  };
  