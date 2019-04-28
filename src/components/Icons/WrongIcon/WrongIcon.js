import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import { IconContext } from "react-icons";

import styles from './WrongIcon.css';

class WrongIcon extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { className } = this.props;

    return (
      <IconContext.Provider value={{ className: classNames(className, styles.wrong) }}>
        <div id="wrong-icon">
          <FaTimes />
        </div>
      </IconContext.Provider> 
    );
  }
}

WrongIcon.propTypes = {
  className: PropTypes.string
};

export default WrongIcon;
