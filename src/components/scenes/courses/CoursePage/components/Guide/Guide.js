import React, { Component } from 'react';
import {
  CircularProgress, Typography, Button, Select, MenuItem
} from '@material-ui/core';
import BootstrapDropdownInput from '../../../../../../bootstrap/dropdownInput';
import EmptyStatePage from '../../../../../common/containers/EmptyStatePage';
import Exercise from '../Exercise';
import styles from './Guide.module.sass';

export default class Guide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStudentId: props.userId || ''
    };
  }

  componentDidMount() {
    const {
      isLoadingExercises, getExercises, courseId, guideId, userId
    } = this.props;

    if (isLoadingExercises) {
      getExercises({ courseId, guideId, userId });
    }
  }

  componentDidUpdate() {
    const {
      isLoadingExercises, getExercises, courseId, guideId, userId
    } = this.props;

    if (isLoadingExercises) {
      getExercises({ courseId, guideId, userId });
    }
  }

  onChangeStudent = (event) => {
    const { onFilterUser, courseId, guideId } = this.props;
    const currentStudentId = event.target.value;

    this.setState({ currentStudentId });
    onFilterUser({ courseId, guideId, userId: currentStudentId });
  }

  renderEmptyState = () => {
    const { exercises, isProfessor, userId } = this.props;

    if (exercises.length) {
      return null;
    }

    let title;
    if (!isProfessor) {
      title = 'Esta guía se ha publicado sin ejercicios';
    } else if (userId) {
      title = 'El alumno aún no ha entregado ningún ejercicio';
    } else {
      title = 'Aún no tienes ejercicios para esta guía';
    }

    let subtitle;
    if (!isProfessor) {
      subtitle = 'Pide a tu profesor que publique al menos uno!';
    } else if (userId) {
      subtitle = '';
    } else {
      subtitle = 'Puedes empezar creando uno!';
    }

    return (
      <EmptyStatePage
        title={title}
        subtitle={subtitle}
      />
    );
  }

  render() {
    const { currentStudentId } = this.state;
    const {
      courseId, guideId, users, userId, guide, exercises, onCreateExercise, isLoadingExercises, isProfessor
    } = this.props;

    const students = users.filter((user) => user.role === 'student');
    const shouldRenderCreateExercise = isProfessor && !userId;
    const shouldRenderStudentFilter = isProfessor && students && !!students.length;

    if (isLoadingExercises) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }

    return (
      <div className={styles.exerciseInfo}>
        <div className={styles.exercisesHeader}>
          <Typography align="center" variant="h6" className={styles.guideTitle}>
            Ejercicios ({guide.name})
          </Typography>

          {shouldRenderCreateExercise && (
            <div className={styles.addButton}>
              <Button
                onClick={() => onCreateExercise({ courseId, guideId })}
                id="create-new-course"
                variant="outlined"
                color="primary"
              >
                Crear nuevo ejercicio
              </Button>
            </div>
          )}
        </div>

        {shouldRenderStudentFilter && (
          <div className={styles.studentSelector}>
            <Typography
              className={styles.labelSelector}
              variant="body1"
              color="textSecondary"
            >
              Filtro por estudiante:
            </Typography>

            <Select
              id="student-selector"
              value={currentStudentId}
              onChange={this.onChangeStudent}
              input={<BootstrapDropdownInput />}
            >
              {[
                <MenuItem key="none" value="">-</MenuItem>,
                ...students.map((u) => (
                  <MenuItem key={u.name} value={u.userId}>{u.name}</MenuItem>
                ))
              ]}
            </Select>
          </div>
        )}

        <div className={styles.exerciseList}>
          {exercises.map((exercise) => (
            <Exercise
              key={exercise.exerciseId}
              exercise={exercise}
              isProfessor={isProfessor}
              userId={userId}
            />
          ))}
          {this.renderEmptyState()}
        </div>
      </div>
    );
  }
}
