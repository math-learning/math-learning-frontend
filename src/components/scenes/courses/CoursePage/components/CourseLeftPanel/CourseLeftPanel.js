import React from 'react';
import LeftPanelGuides from './LeftPanelGuides';
import LeftPanel from '../../../../../common/containers/LeftPanel/LeftPanel';
import LeftPanelLink from '../../../../../common/containers/LeftPanel/LeftPanelLink';

export default function CourseLeftPanel(props) {
  const {
    courseId, guides, loadUsersPage, loadStatisticsPage, returnToCourses, isProfessor
  } = props;

  return (
    <LeftPanel>
      <LeftPanelLink text="Mis cursos" includeBack onClick={returnToCourses} />
      <LeftPanelLink text="Usuarios" onClick={loadUsersPage} />
      { isProfessor && (
        <LeftPanelLink text="Estadisticas" onClick={loadStatisticsPage} />
      )}
      <LeftPanelGuides
        isProfessor={isProfessor}
        courseId={courseId}
        guides={guides}
      />
    </LeftPanel>
  );
}
