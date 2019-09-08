import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContentWrapper } from './SnackbarContentWrapper';

class SnackbarWrapper extends Component {
  handleClose() {
    const { handleClose } = this.props;
    handleClose();
  }

  render() {
    const {
      message, variant, open, autoHideDuration,
    } = this.props;
    const { handleClose } = this.props;
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={autoHideDuration}
          onClose={handleClose}
        >
          <SnackbarContentWrapper
            onClose={handleClose}
            variant={variant}
            message={message}
          />
        </Snackbar>
      </div>
    );
  }
}

export default SnackbarWrapper;
