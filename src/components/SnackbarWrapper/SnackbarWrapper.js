import React, { Component, SyntheticEvent } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles, Theme } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));
  
  const useStyles2 = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

class SnackbarWrapper extends Component {
    
    handleClose() {
        this.props.handleClose();
    }

    render() {

        const {message, variant, open, autoHideDuration} = this.props;
        const {handleClose} = this.props;
        const Icon = variantIcon[variant];
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={open}
                    autoHideDuration={autoHideDuration}
                    onClose={handleClose}
                >
                    <SnackbarContent
                        className={clsx(useStyles1[variant])}
                        aria-describedby="client-snackbar"
                        message={
                        <span id="client-snackbar" className={useStyles1.message}>
                            <Icon className={clsx(useStyles1.icon, useStyles1.iconVariant)} />
                            {message}
                        </span>
                        }
                        action={[
                        <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon className={useStyles1.icon} />
                        </IconButton>,
                        ]}
                    />
                </Snackbar>
            </div>
        )
    }
}

export default SnackbarWrapper;