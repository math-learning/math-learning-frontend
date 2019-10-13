import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa';
import styles from './WrongIcon.css';

export default function WrongIcon(props) {
  const { className } = props;

  return (
    <IconContext.Provider value={{ className: classNames(className, styles.right) }}>
      <div id="check-icon">
        <FaTimes />
      </div>
    </IconContext.Provider>
  );
}

WrongIcon.propTypes = {
  className: PropTypes.string,
};
