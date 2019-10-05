import React, { Component } from 'react';

const styles = require('./Modal.module.sass');

class Modal extends Component {
  constructor(props) {
    super(props);
    this.onOverlayClick = this.onOverlayClick.bind(this);
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

  listenKeyboard(event) {
    const { onClose } = this.props;

    if (event.key === 'Escape' || event.keyCode === 27) {
      onClose();
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <div className={styles.overlay} />
        <div className={styles.content} onClick={this.onOverlayClick}>
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;

