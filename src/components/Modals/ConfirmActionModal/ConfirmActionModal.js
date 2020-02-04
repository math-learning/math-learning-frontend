import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Typography, Button } from '@material-ui/core';

import Modal from '../Modal';
import styles from './ConfirmActionModal.module.sass';

class ConfirmActionModal extends React.Component {
  renderAcceptButton = () => {
    const {
      actionType,
      acceptButton,
      onAcceptAction
    } = this.props;

    return (
      <Button
        color={actionType === 'ask' ? 'primary' : 'secondary'}
        variant="outlined"
        id="accept-action"
        onClick={onAcceptAction}
        size="small"
        className={styles.button}
      >
        {acceptButton || 'Ejecutar'}
      </Button>
    );
  };

  render() {
    const {
      title,
      actionType,
      explanation,
      onClose
    } = this.props;

    return (
      <Modal className={styles.modal} onClose={onClose}>
        <div className={classNames(styles.title, styles[actionType || 'warning'])}>
          <Typography id="modal-title" variant="h4">
            {title}
          </Typography>
        </div>

        <div className={styles.content}>
          {explanation ? (
            <Typography
              id="explanation"
              color="textPrimary"
              variant="body1"
              className={styles.explanation}
            >
              {explanation}
            </Typography>
          ) : null}

          <div className={styles.actions}>
            <Button
              variant="outlined"
              id="cancel-action"
              onClick={onClose}
              size="small"
              className={styles.button}
            >
              Cancelar
            </Button>
            {this.renderAcceptButton()}
          </div>
        </div>
      </Modal>
    );
  }
}

ConfirmActionModal.propTypes = {
  title: PropTypes.string,
  actionType: PropTypes.string,
  explanation: PropTypes.string
};

export default ConfirmActionModal;
