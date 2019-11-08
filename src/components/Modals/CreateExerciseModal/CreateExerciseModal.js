import React, { Component } from 'react';
import {
  TextField, Radio, FormControl, FormLabel, RadioGroup, FormControlLabel
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Modal from '../Modal';
import MathTextBox from '../../MathTextBox';

import styles from './CreateExerciseModal.module.sass';

class CreateExerciseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      type: "derivada",
      exercise: null,
      difficulty: "facil",
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
    const { createExerciseDisabled, type, difficulty, exercise } = this.state;

    return (
      <Modal className={styles.modal} onClose={onClose}>
        <TextField
          id="signup-name"
          label="Nombre del ejercicio"
          onChange={this.onChangeName}
          className={styles.name}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <div className={styles.dropdownContainer}>
          {/* <InputLabel id="type-label" shrink className={styles.selectLabel}>Tipo de ejercicio</InputLabel> */}
          <span className={styles.label}>Tipo de ejercicio</span>
          <Select value={type} onChange={this.onChangeType} className={styles.dropdown}>
            <MenuItem value="derivada">Derivada</MenuItem>
            <MenuItem value="integral">Integral</MenuItem>
          </Select>
        </div>

        {/* <InputLabel id="type-label" shrink className={styles.exerciseLabel}>Escriba su ejercicio</InputLabel> */}
        <span className={styles.label}>Escriba su ejercicio</span>
        <MathTextBox
          content={exercise}
          className={styles.exercise}
          onEnter={() => {}}
          onContentChange={(context) => this.onChangeExercise({ target: { value: context } })}
        />

        <div className={styles.dropdownContainer}>
          {/* <InputLabel id="difficulty-label" shrink className={styles.selectLabel}>Dificultad</InputLabel> */}
          <span className={styles.label}>Dificultad del ejercicio</span>
          <Select value={difficulty} onChange={this.onChangeDifficulty} className={styles.dropdown}>
            <MenuItem value="facil">Facil</MenuItem>
            <MenuItem value="medio">Medio</MenuItem>
            <MenuItem value="dificil">Dificil</MenuItem>
          </Select>
        </div>

        {/* <InputLabel id="type-label" shrink className={styles.exerciseLabel}>Agregar una descricion</InputLabel> */}
        <span className={styles.label}>Agregar una description</span>
        <TextField
          id="signup-name"
          onChange={this.onChangeName}
          className={styles.description}
          fullWidth
          multiline
          margin="normal"
          variant="outlined"
        />

        <Button
          id="create-exercise-button"
          onClick={this.onCreateExercise}
          size="large"
          disabled={createExerciseDisabled}
          className={classNames(
            styles.createAccount,
            createExerciseDisabled ? styles.createExerciseDisabled : styles.createExerciseEnabled
          )}
        >
          Crear ejercicio
        </Button>
      </Modal>
    );
  }
}

export default CreateExerciseModal;
