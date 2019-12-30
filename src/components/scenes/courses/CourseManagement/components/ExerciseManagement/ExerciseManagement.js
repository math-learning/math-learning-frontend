import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MathText from '../../../../../MathText/MathText.container';
import styles from './ExerciseManagement.module.sass';

export default class ExerciseManagement extends Component {
  constructor(props) {
    super(props);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.onDeleteOptionClick = this.onDeleteOptionClick.bind(this);
    this.state = {
      anchorEl: null
    };
  }

  onDeleteOptionClick(onClickHandler) {
    return () => {
      onClickHandler();
      this.closeMenu();
    };
  }

  closeMenu() {
    this.setState({ anchorEl: null });
  }

  showMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  render() {
    const { exercise, onDeleteExercise } = this.props;
    const { anchorEl } = this.state;
    return (
      <Card className={styles.card}>
        <div className={styles.displayLine}>
          <div className={styles.fullWidth}>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Typography className={styles.tcGray1}>
                  Nombre:
                  {exercise.name}
                </Typography>
                <Typography className={styles.tcGray1}>
                  Dificultad:
                  {exercise.difficulty}
                </Typography>
                <Typography className={styles.tcGray1}>
                  Tipo:
                  {exercise.type}
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography className={styles.tcGray1}>Enunciado: Resuelva paso a paso</Typography>
                <span>
                  <MathText content={exercise.exercise} className={styles.exercise} />
                </span>

              </Grid>

            </Grid>
            {/* <Typography>Teoremas: {theorems.map(theorem => theorem.name)}</Typography> */}
          </div>

          {/* TODO: on click */}
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={this.showMenu}
            className={styles.editButton}
            edge="end"
          >
            <MoreVertIcon className={styles.tcGray1} fontSize="small" />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={this.closeMenu}
          >
            <MenuItem onClick={this.closeMenu}>Editar</MenuItem>
            <MenuItem onClick={this.onDeleteOptionClick(onDeleteExercise)}>Eliminar</MenuItem>
          </Menu>

        </div>
      </Card>
    );
  }
}
