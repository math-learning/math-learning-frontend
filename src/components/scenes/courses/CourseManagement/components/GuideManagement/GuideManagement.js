import React, { Component } from 'react';
import { Container, Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import ExerciseManagement from '../ExerciseManagement/ExerciseManagement';
import styles from '../ExerciseManagement/ExerciseManagement.module.sass';

export default class GuideManagement extends Component {
  updateExercises() {
    const { getExercises, courseId, guide } = this.props;
    console.log(guide);
    if (guide) getExercises({ courseId, guideId: guide.guideId });
  }

  componentDidMount() {
    this.updateExercises();
  }

  componentDidUpdate(prevProps) {
    console.log('location', this.props.location, prevProps.location);
    if (this.props.location !== prevProps.location) {
      this.updateExercises();
    }
  }

  render() {
    const {
      courseId, guide, exercises, showAddExerciseModal
    } = this.props;
    if (!guide) {
      // TODO
      return 'Por favor selecciona una guia';
    }
    const { guideId } = guide;

    return (
      <Container className={styles.exerciseManagement}>

        <Typography align="center" variant="h6" className={styles.guideTitle}>
          {guide.name}
        </Typography>

        {/* TODO: filter
                <div> */}
        {/*    Filtro de ejercicios por si tiene muchos */}
        {/* </div> */}

        <div className={styles.exerciseList}>
          {exercises.map((exercise) => <ExerciseManagement exercise={exercise} />)}
        </div>

        <Grid container>
          {/* // TODO: pagination */}
          <Grid item xs={8} className={styles.pages}>
            {/*    1 2 3 4 ... 123 */}
          </Grid>
          <Grid item xs={4} className={styles.fabContainer}>
            <Fab color="primary" aria-label="add" className={styles.fab}>
              {/* TODO: on click open add exercise */}
              <AddIcon onClick={() => showAddExerciseModal({ courseId, guideId })} />
            </Fab>
          </Grid>
        </Grid>

      </Container>
    );
  }
}
