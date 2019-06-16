import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import { IconContext } from "react-icons";

import styles from './CheckIcon.css';

class CheckIcon extends Component {
  render() {
    const { className } = this.props;

    return (
      <IconContext.Provider value={{ className: classNames(className, styles.right) }}>
        <div id="check-icon">
          <FaCheck />
        </div>
      </IconContext.Provider> 
    );
  }
}

CheckIcon.propTypes = {
  className: PropTypes.string
};

export default CheckIcon;
