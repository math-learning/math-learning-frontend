import React, { Component } from 'react';

const styles = require('./Modal.module.sass');

class Modal extends Component {
  constructor(props) {
    super(props);
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onDialogClick = this.onDialogClick.bind(this);
  }

  componentDidMount() {
    const { onClose } = this.props;

    if (onClose) {
      window.addEventListener('keydown', this.listenKeyboard.bind(this), true);
    }
  }

  componentWillUnmount() {
    const { onClose } = this.props;

    if (onClose) {
      window.removeEventListener('keydown', this.listenKeyboard.bind(this), true);
    }
  }

  onOverlayClick() {
    const { onClose } = this.props;

    onClose();
  }

  onDialogClick(event) {
    event.stopPropagation();
  }

  listenKeyboard(event) {
    const { onClose } = this.props;

    if (event.key === 'Escape' || event.keyCode === 27) {
      onClose();
    }
  }

  render() {
    const { children, className } = this.props;

    return (
      <div>
        <div className={styles.overlay} />
        <div className={styles.content} onClick={this.onOverlayClick}>
          <div className={className} onClick={this.onDialogClick}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;

