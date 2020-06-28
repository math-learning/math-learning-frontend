import React, { Component } from 'react';
import {
  TextField, Typography, FormControl, InputLabel, Button, Select, MenuItem
} from '@material-ui/core';

import Modal from '../Modal';
import MathTextBox from '../../common/math/MathTextBox';
import BootstrapDropdownInput from '../../../bootstrap/dropdownInput';
import styles from './ExerciseModal.module.sass';

class ExerciseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      type: 'derivative',
      problemInput: null,
      difficulty: 'easy',
      description: null,
      actionDisabled: true
    };
  }

  chechIfActionDisabled = () => {
    const {
      name,
      type,
      problemInput,
      difficulty
    } = this.state;
    const actionDisabled = !name || !type || !problemInput || !difficulty;

    this.setState({ actionDisabled });
  };

  onChangeName = (event) => {
    const newName = event.target.value;

    this.setState({ name: newName });
    this.chechIfActionDisabled();
  };

  onChangeType = (event) => {
    const newType = event.target.value;

    this.setState({ type: newType });
    this.chechIfActionDisabled();
  };

  onChangeDifficulty = (event) => {
    const newDif = event.target.value;

    this.setState({ difficulty: newDif });
    this.chechIfActionDisabled();
  };

  onChangeExercise = (event) => {
    const { problemInput } = this.state;
    const newExercise = event.target.value;

    if (problemInput !== newExercise) {
      this.setState({ problemInput: newExercise });
      this.chechIfActionDisabled();
    }
  };

  render() {
    const {
      onClose, actionText, onActionClick, title
    } = this.props;
    const {
      actionDisabled,
      type,
      difficulty,
      problemInput,
    } = this.state;

    return (
      <Modal className={styles.modal} onClose={onClose}>
        <Typography id="creation-label" color="textPrimary" variant="h4" component="h1">
          {/* Creación de ejercicio */}
          {title}
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
            content={problemInput}
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
            onClick={() => { onActionClick(this.state); }}
            size="large"
            disabled={actionDisabled}
            className={styles.button}
          >
            {actionText}
          </Button>
        </div>
      </Modal>
    );
  }
}

export default ExerciseModal;
