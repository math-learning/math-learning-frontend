import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { IconContext } from 'react-icons';
import { FaCheck } from 'react-icons/fa';
import styles from './CheckIcon.css';

export default function CheckIcon(props) {
  const { className, size } = props;

  return (
    <IconContext.Provider value={{ className: classNames(className, styles.right) }}>
      <FaCheck color="green" size={size || '25px'} />
    </IconContext.Provider>
  );
}

CheckIcon.propTypes = {
  className: PropTypes.string,
};
