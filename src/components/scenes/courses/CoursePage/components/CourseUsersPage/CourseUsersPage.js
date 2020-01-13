import React, { Component } from 'react';
import {
  Container, Typography, Table, TableBody, TableCell, TableHead, TableRow
} from '@material-ui/core';

import styles from './CourseUsersPage.module.sass';

export default class CourseUsersPage extends Component {
  getColumns() {
    return (
      <TableRow>
        <TableCell>Nombre</TableCell>
        <TableCell>Mail</TableCell>
        <TableCell>Rol</TableCell>
      </TableRow>
    );
  }

  getRows() {
    const { course: { users } } = this.props;

    return users.map((user) => (
      <TableRow key={user.name}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{this.userRole(user.role)}</TableCell>
      </TableRow>
    ));
  }

  userRole(role) {
    if (role === 'creator') {
      return 'Creador';
    }
    if (role === 'professor') {
      return 'Profesor';
    }
    return 'Estudiante';
  }

  render() {
    return (
      <Container className={styles.content}>
        <Typography align="center" variant="h4" className={styles.title}>
          Usuarios del curso
        </Typography>

        <Table aria-label="simple table">
          <TableHead>
            {this.getColumns()}
          </TableHead>
          <TableBody>
            {this.getRows()}
          </TableBody>
        </Table>
      </Container>
    );
  }
}
