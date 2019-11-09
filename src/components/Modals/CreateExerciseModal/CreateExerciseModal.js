import React, { Component } from 'react';
import classNames from 'classnames';
import { TextField, Typography, FormControl, InputLabel, Button, Select, InputBase, MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Modal from '../Modal';
import MathTextBox from '../../MathTextBox';
import styles from './CreateExerciseModal.module.sass';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 15,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    }
  },
}))(InputBase);

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
            input={<BootstrapInput />}
          >
            <MenuItem value="derivada">Derivada</MenuItem>
            <MenuItem value="integral">Integral</MenuItem>
          </Select>
        </FormControl>

        <div className={styles.exerciseContainer}>
          <Typography color="textSecondary" variant="h7">
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
            input={<BootstrapInput />}
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
