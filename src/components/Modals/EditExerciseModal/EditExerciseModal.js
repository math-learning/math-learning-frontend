import React, { Component } from 'react';
import {
  TextField, Typography, FormControl, InputLabel, Button, Select, MenuItem
} from '@material-ui/core';
import MathText from '../../common/math/MathText';
import BootstrapDropdownInput from '../../../bootstrap/dropdownInput';

import styles from './EditExerciseModal.module.sass';
import Modal from '../Modal';

class EditExerciseModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.currentExercise.name,
      initialHint: props.currentExercise.initialHint,
      difficulty: props.currentExercise.difficulty,
      description: props.currentExercise.description,
      actionDisabled: false
    };
  }

  handleEditExercise = () => {
    const { name, difficulty, description, initialHint } = this.state;
    const { onEditExercise, guideId, courseId, exerciseId } = this.props;

    onEditExercise({
      guideId,
      courseId,
      exerciseId,
      exercise: { name, difficulty, description, initialHint }
    });
  };

  chechIfActionDisabled = ({ name, difficulty }) => {
    const actionDisabled = !name || !difficulty;

    this.setState({ actionDisabled });
  };

  onChangeName = (event) => {
    const newName = event.target.value;

    this.setState({ name: newName });
    this.chechIfActionDisabled({ ...this.state, name: newName });
  };

  onChangeDescription = (event) => {
    const newDescription = event.target.value;

    this.setState({ description: newDescription });
  };

  onChangeHint = (event) => {
    const newHint = event.target.value;

    this.setState({ initialHint: newHint });
  };

  onChangeDifficulty = (event) => {
    const newDif = event.target.value;

    this.setState({ difficulty: newDif });
    this.chechIfActionDisabled({ ...this.state, difficulty: newDif });
  };

  render() {
    const { onClose, currentExercise: { problemInput } } = this.props;
    const { actionDisabled, difficulty, name, description, initialHint } = this.state;

    return (
      <Modal className={styles.modal} onClose={onClose}>
        <Typography id="creation-label" color="textPrimary" variant="h4" component="h1">
          Editar ejercicio
        </Typography>

        <TextField
          id="exercise-name"
          label="Nombre"
          margin="dense"
          defaultValue={name}
          onChange={this.onChangeName}
          className={styles.name}
        />

        <MathText id="problem-input" className={styles.solvedExerice} content={problemInput} />

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
          defaultValue={description}
          onChange={this.onChangeDescription}
          className={styles.optional}
          fullWidth
          multiline
          rowsMax="4"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="exercise-hint"
          label="Pista inicial (opcional)"
          defaultValue={initialHint}
          onChange={this.onChangeHint}
          className={styles.optional}
          fullWidth
          multiline
          rowsMax="1"
          margin="normal"
          variant="outlined"
        />

        <div className={styles.buttonContainer}>
          <Button
            color="primary"
            variant="contained"
            id="create-exercise-button"
            onClick={this.handleEditExercise}
            size="large"
            disabled={actionDisabled}
            className={styles.button}
          >
            Editar
          </Button>
        </div>
      </Modal>
    );
  }
}

export default EditExerciseModal;
