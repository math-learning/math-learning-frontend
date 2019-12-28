import React, { Component } from 'react';
import styles from '../../../CoursePage/CoursePage.module.sass';
import LinkListItem from '../../../LinkListItem';

export default class LeftPanelElements extends Component {
  render() {
    let { elements } = this.props;
    elements = elements || [];
    return (
      <>
        {elements.map((element) => (
          <LinkListItem
            className={styles.textCenter}
            path={element.path}
            icon={element.icon}
            text={element.text}
            editable={element.editable}
          />
        ))}
      </>
    );
  }
}
