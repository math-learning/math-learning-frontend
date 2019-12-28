import React, { Component } from 'react';
import styles from './ContentHeader.module.sass';

export default class ContentHeader extends Component {
  render() {
    return (
      <div className={styles.contentHeader}>
        {this.props.children}
      </div>
    );
  }
}
