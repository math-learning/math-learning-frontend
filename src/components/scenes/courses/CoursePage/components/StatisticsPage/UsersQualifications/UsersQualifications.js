import React, { Component } from 'react';
import '../../../../../../../../node_modules/react-vis/dist/style.css';
import {
  CircularProgress, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';
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
