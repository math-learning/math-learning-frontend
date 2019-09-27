
import InsertChartRoundedIcon from '@material-ui/icons/InsertChartRounded';
import React from 'react';
import DrawerItems from './DrawerItems';
import styles from './ProfesorItems.module.sass';
import LinkListItemWithIcon from '../LinkListItemWithIcon';

export default function ProfessorItems() {
  return (
    <DrawerItems>
      {/* Professor extra items */}
      <LinkListItemWithIcon to={{ pathname: '/statistics' }} text="Estadisticas" 
          icon={(<InsertChartRoundedIcon className={styles.tcViolet} />)}/>

    </DrawerItems>

  );
}
