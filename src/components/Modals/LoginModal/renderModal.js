import React from 'react';
import ReactDOM from 'react-dom';

import LoginModal from './index';

export default function renderModal() {
  ReactDOM.render(
    <LoginModal />,
    document.getElementById('modal')
  );
}
