import React, { Component } from 'react';
import classNames from 'classnames';
import { TextField, Typography, FormControl, InputLabel, Button, Select, MenuItem } from '@material-ui/core';

import Modal from '../Modal';
import MathTextBox from '../../MathTextBox';
import BootstrapDropdownInput from '../../../bootstrap/dropdownInput';
import styles from './CreateExerciseModal.module.sass';

class CreateExerciseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      type: 'derivada',
      exercise: null,
      difficulty: 'facil',
      description: null,
      createExerciseDisabled: true
    };

    this.onCreateExercise = this.onCreateExercise.bind(this);
  }

  onCreateExercise = () => {
    const { onCreateExercise } = this.props;
    const {
      name,
      type,
      exercise,
      difficulty,
      description
    } = this.state;

    onCreateExercise({
      name,
      type,
      exercise,
      difficulty,
      description
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
        <Typography color="textPrimary" variant="standard" component="h1">
          Creación de ejercicio
        </Typography>

        <TextField
          onChange={this.onChangeName}
          className={styles.name}
          id="outlined-dense-multiline"
          label="Nombre"
          margin="dense"
        />

        <FormControl className={styles.dropdownContainer}>
          <InputLabel id="dropdown-input-label">Tipo de ejercicio</InputLabel>
          <Select
            id="dropdown-selector"
            value={type}
            onChange={this.onChangeType}
            input={<BootstrapDropdownInput />}
          >
            <MenuItem value="derivada">Derivada</MenuItem>
            <MenuItem value="integral">Integral</MenuItem>
          </Select>
        </FormControl>

        <div className={styles.exerciseContainer}>
          <Typography color="textSecondary" variant="body2">
            Escriba el ejercicio
          </Typography>
          <MathTextBox
            content={exercise}
            className={styles.exercise}
            onEnter={() => {}}
            onContentChange={(context) => this.onChangeExercise({ target: { value: context } })}
          />
        </div>

        <FormControl className={styles.dropdownContainer}>
          <InputLabel variant="h7" id="dropdown-input-label">Dificultad</InputLabel>
          <Select
            id="dropdown-selector"
            value={difficulty}
            onChange={this.onChangeDifficulty}
            input={<BootstrapDropdownInput />}
          >
            <MenuItem value="facil">Fácil</MenuItem>
            <MenuItem value="medio">Medio</MenuItem>
            <MenuItem value="dificil">Difícil</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="create-ex-description"
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
