import React from 'react';
import LeftPanelTitle from '../../../../../common/containers/LeftPanel/LeftPanelTitle';
import LeftPanelEditableElements from '../../../../../common/containers/LeftPanel/LeftPanelEditableElements';
import LeftPanel from '../../../../../common/containers/LeftPanel/LeftPanel';
import styles from './EditableGuidesLeftPanel.module.sass';

export default function EditableGuidesLeftPanel(props) {
  const {
    courseId, guides, updateGuide, createGuide, selectGuide, deleteGuide
  } = props;

  const onElementUpdate = (element) => (value) => updateGuide({
    courseId,
    guideId: element.id,
    guideName: value,
    guideDescription: element.description
  });

  const onDeleteElement = (element) => () => deleteGuide(element);

  const createGuideWithoutDescription = (name) => createGuide({
    courseId,
    guideName: name,
    guideDescription: 'description'
  });

  let processedGuides;
  const onClickActionsById = {};
  if (guides) {
    processedGuides = guides.map((guide) => ({ ...guide, id: guide.guideId }));
    processedGuides.forEach((guide) => {
      onClickActionsById[guide.id] = () => {
        selectGuide({ courseId, guideId: guide.id });
      };
    });
  }

  return (
    <LeftPanel>
      <LeftPanelTitle text="Guias" className={styles.guidesTitle} />
      <LeftPanelEditableElements
        elements={processedGuides}
        onClickActionsById={onClickActionsById}
        onElementUpdate={onElementUpdate}
        onDeleteElement={onDeleteElement}
        addElementText="Agregar Guia"
        onCreateElement={createGuideWithoutDescription}
        className={styles.editableItems}
      />
    </LeftPanel>
  );
}
