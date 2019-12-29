import React from 'react';
import styles from '../../../CoursePage/CoursePage.module.sass';
import LinkListItem from '../../../LinkListItem';

export default function LeftPanelElements(props) {
  let { elements } = props;
  elements = elements || [];
  return (
    <React.Fragment>
      {elements.map((element) => (
        <LinkListItem
          className={styles.textCenter}
          path={element.path}
          icon={element.icon}
          text={element.text}
          editable={element.editable}
        />
      ))}
    </React.Fragment>
  );
}
