import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa';
import styles from './WrongIcon.css';

export default function WrongIcon(props) {
  const { className, size } = props;

  return (
    <IconContext.Provider value={{ className: classNames(className, styles.wrong) }}>
      <FaTimes color="red" size={size || '25px'} />
    </IconContext.Provider>
  );
}

WrongIcon.propTypes = {
  className: PropTypes.string,
};
