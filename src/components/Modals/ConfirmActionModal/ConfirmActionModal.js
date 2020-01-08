import React from 'react';
import classNames from 'classnames';
import { Typography, Button } from '@material-ui/core';

import Modal from '../Modal';
import styles from './ConfirmActionModal.module.sass';

export default function ConfirmActionModal(props) {
  const {
    title,
    actionType,
    explanation,
    acceptButton,
    onClose,
    onAcceptAction
  } = props;

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
        </div>
      </div>
    </Modal>
  );
}
