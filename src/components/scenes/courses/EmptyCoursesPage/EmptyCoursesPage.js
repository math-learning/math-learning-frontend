import { Button, Container, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './EmptyCoursesPage.module.sass';

export default function EmptyCoursesPage(props) {
  const { searchCoursesPath } = props;

  return (
    <Container maxWidth="md" className={clsx(styles.defaultContainer, styles.container)}>
      <div className={styles.image} />
      <Typography className={styles.primaryText} variant="h4">Ups! parece que no estas matriculado en ningún curso..</Typography>
      <Typography className={styles.secondaryText} variant="h6" color="textSecondary">Pero no te preocupes! ve a la página de búsqueda para comenzar a aprender!</Typography>
      <Link className={styles.linkWithoutStyles} to={{ pathname: searchCoursesPath }}>
        <Button className={styles.searchCoursesButton} color="primary" variant="outlined">Ir a la página de búsqueda</Button>
      </Link>
    </Container>
  );
}
