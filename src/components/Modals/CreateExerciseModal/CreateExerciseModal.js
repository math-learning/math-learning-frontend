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
// const materialStyles = () => ({
//   select: {
//     '&:before': {
//       borderColor: '#000',
//     },
//     '&:after': {
//       borderColor: '#000',
//     }
//   },
//   icon: {
//     fill: '#000',
//   },
// });

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
          onChange={this.onChangeName}
          className={styles.name}
          id="outlined-dense-multiline"
          label="Nombre del ejercicio"
          margin="dense"
          variant="outlined"
        />

        <div className={styles.dropdownContainer}>
          <span className={styles.dropdownLabel}>Tipo de ejercicio</span>
          <Select value={type} onChange={this.onChangeType} className={styles.dropdown}>
            <MenuItem value="derivada">Derivada</MenuItem>
            <MenuItem value="integral">Integral</MenuItem>
          </Select>
        </div>

        <div className={styles.exerciseContainer}>
          <span className={styles.exerciseLabel}>Escriba su ejercicio</span>
          <MathTextBox
            content={exercise}
            className={styles.exercise}
            onEnter={() => {}}
            onContentChange={(context) => this.onChangeExercise({ target: { value: context } })}
          />
        </div>

        <div className={styles.dropdownContainer}>
          <span className={styles.dropdownLabel}>Dificultad del ejercicio</span>
          <Select value={difficulty} onChange={this.onChangeDifficulty} className={styles.dropdown}>
            <MenuItem value="facil">Facil</MenuItem>
            <MenuItem value="medio">Medio</MenuItem>
            <MenuItem value="dificil">Dificil</MenuItem>
          </Select>
        </div>
        {/* <FormControl className={styles.dropdownContainer}>
          <InputLabel id="demo-simple-select-label">Dificultad del ejercicio</InputLabel>
          <Select value={difficulty} onChange={this.onChangeDifficulty} className={styles.dropdown}>
            <MenuItem value="facil">Facil</MenuItem>
            <MenuItem value="medio">Medio</MenuItem>
            <MenuItem value="dificil">Dificil</MenuItem>
          </Select>
        </FormControl> */}

        <TextField
          id="create-ex-description"
          label="Descripción del ejercicio"
          onChange={this.onChangeName}
          className={styles.description}
          fullWidth
          multiline
          rowsMax="4"
          margin="normal"
          variant="outlined"
        />

        <Button
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
      </Modal>
    );
  }
}

export default CreateExerciseModal;
