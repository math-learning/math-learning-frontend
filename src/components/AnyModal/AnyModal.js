import React from 'react';
import Modal from '../Modal';

class AnyModal extends React.Component {
  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    const { hideModal } = this.props;
    hideModal();
  }

  render() {
    return (
      <Modal onClose={this.onClose}>
         <div className="login">
           <h1>Login</h1>
         </div>
      </Modal>
    );
  }
};

export default AnyModal;
