import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  TextField, Typography, FormControl, InputLabel, Button, Select, MenuItem, CircularProgress
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import BootstrapTooltip from '../../../../../../bootstrap/Tooltip';
import BootstrapDropdownInput from '../../../../../../bootstrap/dropdownInput';
import MathText from '../../../../../common/math/MathText';
import MathTextBox from '../../../../../common/math/MathTextBox';
import styles from './CreateExercisePage.module.sass';

class CreateExercisePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      initialHint: null,
      type: 'derivative',
      problemInput: null,
      difficulty: 'easy',
      description: null,
      actionDisabled: true
    };
  }

  componentWillUnmount() {
    this.onResetExerciseError();
    this.onResetSolvedExercise();
  }

  chechIfActionDisabled = ({
    name,
    type,
    problemInput,
    difficulty
  }) => {
    const actionDisabled = !name || !type || !problemInput || !difficulty;

    this.setState({ actionDisabled });
  };

  handleOnCancel = () => {
    const { onCancel, guideId, courseId } = this.props;

    return onCancel({ courseId, guideId });
  }

  handleOnCreateExercise = () => {
    const {
      name,
      type,
      initialHint,
      problemInput,
      difficulty,
      description
    } = this.state;
    const { onCreateExercise, guideId, courseId } = this.props;

    onCreateExercise({
      guideId,
      courseId,
      exercise: {
        name,
        type,
        initialHint,
        problemInput,
        difficulty,
        description
      }
    });
  };

  handleEvaluateExercise = () => {
    const { type, problemInput } = this.state;
    const { onEvaluateExercise, guideId, courseId } = this.props;

    onEvaluateExercise({
      guideId,
      courseId,
      exercise: { type, problemInput }
    });
  };

  onResetExerciseError = () => {
    const { resetExerciseError, creatingExerciseError } = this.props;

    if (creatingExerciseError) {
      resetExerciseError();
    }
  }

  onResetSolvedExercise = () => {
    const { resetSolvedExercise, solvedCreatingExercise } = this.props;

    if (solvedCreatingExercise) {
      resetSolvedExercise();
    }
  }

  onChangeName = (event) => {
    const newName = event.target.value;

    this.setState({ name: newName });
    this.chechIfActionDisabled({ ...this.state, name: newName });
    this.onResetExerciseError();
  };

  onChangeDescription = (event) => {
    const newDescription = event.target.value;

    this.setState({ description: newDescription });
    this.onResetExerciseError();
  };

  onChangeHint = (event) => {
    const newHint = event.target.value;

    this.setState({ initialHint: newHint });
    this.onResetExerciseError();
  };

  onChangeType = (event) => {
    const newType = event.target.value;

    this.setState({ type: newType });
    this.chechIfActionDisabled({ ...this.state, type: newType });
    this.onResetExerciseError();
  };

  onChangeDifficulty = (event) => {
    const newDif = event.target.value;

    this.setState({ difficulty: newDif });
    this.chechIfActionDisabled({ ...this.state, difficulty: newDif });
    this.onResetExerciseError();
  };

  onChangeExercise = (event) => {
    const { problemInput } = this.state;
    const newExercise = event.target.value;

    if (problemInput !== newExercise) {
      this.setState({ problemInput: newExercise });
      this.chechIfActionDisabled({ ...this.state, problemInput: newExercise });
      this.onResetExerciseError();
      this.onResetSolvedExercise();
    }
  };

  render() {
    const {
      actionDisabled,
      type,
      difficulty,
      problemInput,
    } = this.state;
    const {
      isCreatingExercise,
      isEvaluatingExercise,
      creatingExerciseError,
      solvedCreatingExercise,
    } = this.props;
    const isActionButtonDisabled = actionDisabled && !isCreatingExercise;

    return (
      <div className={styles.container}>
        <Typography
          id="creation-label"
          color="textPrimary"
          variant="h5"
          className={styles.title}
        >
          Crear nuevo ejercicio
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
          onChange={this.onChangeHint}
          className={styles.optional}
          fullWidth
          multiline
          rowsMax="1"
          margin="normal"
          variant="outlined"
        />

        <div className={styles.exerciseRow}>
          <div className={styles.exerciseContainer}>
            <div className={styles.writeExerciseTitle}>
              <Typography color="textSecondary" variant="body2">
                Escriba el ejercicio
              </Typography>
              <BootstrapTooltip title="Solo escribir el contenido la integral o la derivada" placement="top-start">
                <InfoIcon id="info-icon" fontSize="small" className={styles.icon} />
              </BootstrapTooltip>
            </div>
            <MathTextBox
              id="exercise-math-textbox"
              content={problemInput}
              className={styles.exercise}
              onEnter={() => {}}
              onContentChange={(context) => this.onChangeExercise({ target: { value: context } })}
            />
          </div>

          <div className={styles.solvedContainer}>
            <Button
              id="evaluate-exercise"
              onClick={this.handleEvaluateExercise}
              disabled={!problemInput || isEvaluatingExercise}
              variant="contained"
              color="primary"
            >
              Evaluar ejercicio
            </Button>
            {isEvaluatingExercise && (
              <div className={styles.loading}>
                <CircularProgress disableShrink size="25px" />
              </div>
            )}
            {solvedCreatingExercise && (
              <div className={styles.solvedExericeContainer}>
                <Typography color="textSecondary" variant="h6">
                  Solución:
                </Typography>
                <MathText
                  id="solved-exercise"
                  className={styles.solvedExerice}
                  content={solvedCreatingExercise.expression}
                />
              </div>
            )}
          </div>
        </div>

        {creatingExerciseError && (
          <span className={styles.error}>{creatingExerciseError}</span>
        )}

        <div className={styles.buttonContainer}>
          <Button
            color="secondary"
            variant="contained"
            id="cancel-creation-button"
            onClick={this.handleOnCancel}
            size="large"
            className={styles.cancelButton}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            variant="contained"
            id="create-exercise-button"
            onClick={this.handleOnCreateExercise}
            size="large"
            disabled={isActionButtonDisabled}
            className={styles.button}
          >
            Crear ejercicio
          </Button>
          {isCreatingExercise && (
            <div className={styles.loading}>
              <CircularProgress disableShrink />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(CreateExercisePage);
