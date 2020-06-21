import React, { Component } from 'react';
import classNames from 'classnames';
import '../../../../../../../../node_modules/react-vis/dist/style.css';
import {
  CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import BootstrapTooltip from '../../../../../../../bootstrap/Tooltip';
import styles from '../StatisticsCommon.module.sass';
import particularStyles from './UsersQualifications.module.sass';

export default class UsersQualifications extends Component {
  componentDidMount() {
    const { statistics, course, getUsersQualifications } = this.props;

    if (!statistics) {
      getUsersQualifications(course.courseId);
    }
  }

  getColumns() {
    return (
      <TableRow>
        <TableCell>Nombre</TableCell>
        <TableCell>Cantidad de entregas</TableCell>
        <TableCell>Puntaje</TableCell>
      </TableRow>
    );
  }

  getRows() {
    const { statistics } = this.props;

    return statistics.map((user) => (
      <TableRow key={user.name}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.deliveryCount}</TableCell>
        <TableCell>{user.qualification}</TableCell>
      </TableRow>
    ));
  }

  render() {
    const { statistics } = this.props;

    if (!statistics) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }

    return (
      <div className={particularStyles.container}>
        <div className={classNames(particularStyles.title, styles.title)}>
          <Typography align="center" variant="h5">
            Ranking de calificaciones
          </Typography>

          {!statistics.length && (
            <BootstrapTooltip
              title="Para que hayan alumnos en el ranking, primero deben ser calificados"
              placement="top-start"
            >
              <InfoIcon id="info-icon" fontSize="small" className={particularStyles.icon} />
            </BootstrapTooltip>
          )}
        </div>

        <Table aria-label="user-qualifications">
          <TableHead>
            {this.getColumns()}
          </TableHead>
          <TableBody>
            {this.getRows()}
          </TableBody>
        </Table>
      </div>
    );
  }
}
