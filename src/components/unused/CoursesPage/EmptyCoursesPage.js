import { Button, Container, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './EmptyCoursesPage.module.sass';

export default function EmptyCoursesPage() {
  return (
    <Container maxWidth="md" className={clsx(styles.defaultContainer, styles.container)}>
      <div className={styles.image} />
      <Typography className={styles.primaryText} variant="h4">Ups! parece que no estas matriculado en ningun curso..</Typography>
      <Typography className={styles.secondaryText} variant="h6" color="textSecondary">Pero no te preocupes! ve a la pagina de busqueda para comenzar a aprender!</Typography>
      <Link className={styles.linkWithoutStyles} to={{ pathname: '/search-courses' }}>
        <Button className={styles.searchCoursesButton} color="primary" variant="outlined">Ir a la pagina de busqueda</Button>
      </Link>
    </Container>
  );
}
