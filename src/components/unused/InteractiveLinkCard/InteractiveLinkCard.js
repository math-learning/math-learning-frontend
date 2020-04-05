import { Card } from '@material-ui/core';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../../../App.module.sass';

/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-access-state-in-setstate */
export default class InteractiveLinkCard extends Component {
  constructor(props) {
    super(props);
    this.state = { raised: false };
  }

  onMouseEnter = () => {
    this.setState({ ...this.state, raised: true });
  };

  onMouseLeave = () => {
    this.setState({ ...this.state, raised: false });
  };

  render() {
    const { raised } = this.state;
    const { path, className, children } = this.props;

    const newClassName = className !== undefined && className !== null ? className : '';
    return (
      <Link className={styles.linkWithoutStyles} to={{ pathname: path }}>
        <Card
          className={newClassName}
          raised={raised}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
        >
          {children}
        </Card>
      </Link>
    );
  }
}
