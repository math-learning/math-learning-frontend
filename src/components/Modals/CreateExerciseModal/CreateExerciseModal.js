import React, { Component } from 'react';
import classNames from 'classnames';
import {
  TextField, Typography, FormControl, InputLabel, Button, Select, MenuItem
} from '@material-ui/core';

import Modal from '../Modal';
import MathTextBox from '../../MathTextBox';
import BootstrapDropdownInput from '../../../bootstrap/dropdownInput';
import styles from './CreateExerciseModal.module.sass';

class CreateExerciseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      type: 'derivative',
      exercise: null,
      difficulty: 'easy',
      description: null,
      createExerciseDisabled: true
    };

    this.onCreateExercise = this.onCreateExercise.bind(this);
  }

  onCreateExercise = () => {
    const { onCreateExercise, guideId, courseId } = this.props;
    const {
      name,
      type,
      exercise,
      difficulty,
      description
    } = this.state;

    onCreateExercise({
      guideId,
      courseId,
      exercise: {
        name,
        type,
        exercise,
        difficulty,
        description
      }
    });
  };

  checkIfCanCreate = () => {
    const {
      name,
      type,
      exercise,
      difficulty
    } = this.state;
    const createExerciseDisabled = !name || !type || !exercise || !difficulty;

    // TODO: FIX BUG, THE STATE IS NOT UPDATED
    this.setState({ createExerciseDisabled });
  }

  onChangeName = (event) => {
    const newName = event.target.value;

    this.setState({ name: newName });
    this.checkIfCanCreate();
  };

  onChangeType = (event) => {
    const newType = event.target.value;

    this.setState({ type: newType });
    this.checkIfCanCreate();
  };

  onChangeDifficulty = (event) => {
    const newDif = event.target.value;

    this.setState({ difficulty: newDif });
    this.checkIfCanCreate();
  };

  onChangeExercise = (event) => {
    const newExercise = event.target.value;

    this.setState({ exercise: newExercise });
    this.checkIfCanCreate();
  };

  onChangeExercise = (event) => {
    const newExercise = event.target.value;

    this.setState({ exercise: newExercise });
    this.checkIfCanCreate();
  };

  render() {
    const { onClose } = this.props;
    const {
      createExerciseDisabled,
      type,
      difficulty,
      exercise
    } = this.state;

    return (
      <Modal className={styles.modal} onClose={onClose}>
        <Typography id="creation-label" color="textPrimary" variant="h4" component="h1">
          Creación de ejercicio
        </Typography>

        <TextField
          id="exercise-name"
          label="Nombre"
          margin="dense"
          onChange={this.onChangeName}
          className={styles.name}
        />

        <FormControl className={styles.dropdownContainer}>
          <InputLabel id="dropdown-input-label">Tipo de ejercicio</InputLabel>
          <Select
            id="exercise-type-selector"
            value={type}
            onChange={this.onChangeType}
            input={<BootstrapDropdownInput />}
          >
            <MenuItem value="derivative">Derivada</MenuItem>
            <MenuItem value="integral">Integral</MenuItem>
          </Select>
        </FormControl>

        <div className={styles.exerciseContainer}>
          <Typography color="textSecondary" variant="body2">
            Escriba el ejercicio
          </Typography>
          <MathTextBox
            id="exercise-math-textbox"
            content={exercise}
            className={styles.exercise}
            onEnter={() => {}}
            onContentChange={(context) => this.onChangeExercise({ target: { value: context } })}
          />
        </div>

        <FormControl className={styles.dropdownContainer}>
          <InputLabel id="dropdown-input-label">Dificultad</InputLabel>
          <Select
            id="exercise-difficulty-selector"
            value={difficulty}
            onChange={this.onChangeDifficulty}
            input={<BootstrapDropdownInput />}
          >
            <MenuItem value="easy">Fácil</MenuItem>
            <MenuItem value="medium">Medio</MenuItem>
            <MenuItem value="hard">Difícil</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="exercise-description"
          label="Descripción (opcional)"
          onChange={this.onChangeName}
          className={styles.description}
          fullWidth
          multiline
          rowsMax="4"
          margin="normal"
          variant="outlined"
        />

        <div className={styles.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            id="create-exercise-button"
            onClick={this.onCreateExercise}
            size="large"
            disabled={createExerciseDisabled}
            className={classNames(
              styles.button,
              createExerciseDisabled ? styles.createExerciseDisabled : styles.createExerciseEnabled
            )}
          >
            Crear ejercicio
          </Button>
        </div>
      </Modal>
    );
  }
}

export default CreateExerciseModal;
