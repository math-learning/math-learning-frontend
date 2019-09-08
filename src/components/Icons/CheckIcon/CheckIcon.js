import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { IconContext } from 'react-icons';
import { FaCheck } from 'react-icons/fa';
import styles from './CheckIcon.css';

export default function CheckIcon(props) {
  const { className } = props;

  return (
    <IconContext.Provider value={{ className: classNames(className, styles.right) }}>
      <div id="check-icon">
        <FaCheck />
      </div>
    </IconContext.Provider>
  );
}

CheckIcon.propTypes = {
  className: PropTypes.string,
};
