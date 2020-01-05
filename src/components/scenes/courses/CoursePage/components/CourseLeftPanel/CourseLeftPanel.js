import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import LeftPanelGuides from '../../../../../common/containers/LeftPanel/LeftPanelGuides';
import LeftPanel from '../../../../../common/containers/LeftPanel/LeftPanel';
import LeftPanelLink from '../../../../../common/containers/LeftPanel/LeftPanelLink';
import styles from './CourseLeftPanel.module.sass';

export default function CourseLeftPanel(props) {
  const {
    courseId, guides, updateGuide, createGuide, selectGuide, deleteGuide, loadUsersPage,
    isProfessor
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
      { isProfessor
        && (
          <React.Fragment>
            <LeftPanelLink text="Usuarios" onClick={loadUsersPage} />
            <LeftPanelLink text="Estadisticas" onClick={() => {}} />
          </React.Fragment>
        )}
      <ListItem> {'Guias:'} </ListItem>
      <LeftPanelGuides
        isProfessor={isProfessor}
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
