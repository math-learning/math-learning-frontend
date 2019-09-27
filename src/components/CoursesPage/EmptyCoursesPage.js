import React, { Component } from 'react'
import { Typography, Button, Container } from '@material-ui/core'
import styles from './EmptyCoursesPage.module.sass'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
export default class EmptyCoursesPage extends Component {
  render() {

    return (
        <Container maxWidth="md" className={clsx(styles.defaultContainer, styles.container)}>
          <div className={styles.image}/>
          <Typography className={styles.primaryText} variant="h4">Ups! parece que no estas matriculado en ningun curso..</Typography>
          <Typography className={styles.secondaryText} variant="h6" color="textSecondary">Pero no te preocupes! ve a la pagina de busqueda para comenzar a aprender!</Typography>
          <Link className={styles.linkWithoutStyles} to={{pathname: '/search-courses'}}>
            <Button className={styles.searchCoursesButton} color="primary" variant="outlined">Ir a la pagina de busqueda</Button>
          </Link>
        </Container>      
    )

  }
}