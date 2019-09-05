
import React, { Component } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertChartRoundedIcon from '@material-ui/icons/InsertChartRounded';

import { Link } from 'react-router-dom';
import { DrawerItems } from './DrawerItems'
import styles from './ProfesorItems.module.sass'

export class ProfessorItems extends Component {
  render() {
    return (
      <DrawerItems>
        {/* Professor extra items */}
        <Link className={styles.linkWithoutStyles} to={{pathname: '/statistics'}}>
          <ListItem button key={"Statistics"}>
          <ListItemIcon> <InsertChartRoundedIcon className={styles.tcViolet} /> </ListItemIcon>
          <ListItemText primary={"Estadisticas"} />
        </ListItem>  
        </Link>
        
      </DrawerItems>
  
    );
  }
}