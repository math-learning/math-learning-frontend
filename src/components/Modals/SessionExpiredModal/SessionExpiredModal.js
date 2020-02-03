import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Button from '@material-ui/core/Button';
import ConfirmActionModal from '../ConfirmActionModal/ConfirmActionModal';
import styles from './SessionExpiredModal.module.sass';

class SessionExpiredModal extends ConfirmActionModal {
  onClickLogin = (googleUserProfile) => {
    const { onGoogleLogin } = this.props;

    onGoogleLogin(googleUserProfile);
  };

  renderAcceptButton = () => {
    const {
      actionType,
      googleClientId
    } = this.props;

    return (
      <GoogleLogin
        clientId={googleClientId}
        onSuccess={this.onClickLogin}
        cookiePolicy="single_host_origin"
        onFailure={(error) => console.log('google relogin error', error)}
        render={(renderProps) => (
          <Button
            color={actionType === 'ask' ? 'primary' : 'secondary'}
            variant="outlined"
            id="accept-action"

            onClick={renderProps.onClick}
            size="small"
            className={styles.button}
          >
            Volver a loguearse
          </Button>
        )}
      />
    );
  };
}

SessionExpiredModal.defaultProps = {
  title: 'La sesión se ha vencido',
  actionType: 'warning',
  explanation: 'Para seguir utilizando la plataforma deberás volver a loguearte'
};

export default SessionExpiredModal;
