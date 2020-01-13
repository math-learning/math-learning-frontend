import React from 'react';
import LeftPanelGuides from './LeftPanelGuides';
import LeftPanel from '../../../../../common/containers/LeftPanel/LeftPanel';
import LeftPanelLink from '../../../../../common/containers/LeftPanel/LeftPanelLink';

export default function CourseLeftPanel(props) {
  const {
    courseId, guides, loadUsersPage, isProfessor
  } = props;

  return (
    <LeftPanel>
      <LeftPanelLink text="Usuarios" onClick={loadUsersPage} />
      { isProfessor && (
        <LeftPanelLink text="Estadisticas" onClick={() => {}} />
      )}
      <LeftPanelGuides
        isProfessor={isProfessor}
        courseId={courseId}
        guides={guides}
      />
    </LeftPanel>
  );
}
