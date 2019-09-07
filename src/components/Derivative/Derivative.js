 import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CheckIcon from "../Icons/CheckIcon"; // TODO: IMPORTS RELATIVOS
import WrongIcon from "../Icons/WrongIcon";
import MathText from "../MathText";
import MathTextBox from '../MathTextBox';
import {Link} from 'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import styles from './Derivative.module.sass';

class Derivative extends Component {

  handleContentChange({value, index}) {
    this.props.onContentChange({ content: value, index});
  }

  handleSolvedDialogClose() {
    this.props.onCloseExerciseSolvedDialog();
  }

  handleValidateStep = () => {
    const { stepList, problemInput, currentExpression, result, problemIndex} = this.props;

    const lastExpression = stepList.length === 0 ?
      this.props.problemInput :
      stepList[stepList.length - 1];

    this.props.onValidateStep({ stepList, problemInput, lastExpression, currentExpression, result, problemIndex });
  }

  render() {  
    const { className } = this.props;
    const { isValidInput, currentExpression, isFinished, problemIndex, showFinishedExercise } = this.props;

    return (
      <div>
      <div id="derivative-container" className={classNames(styles.container, className)} >
        
        <MathText content={this.props.problemInput} />

        <div id="exercise-steps">
          {this.props.stepList.map((step, index) => (
            <div id={`right-step-${index}`} key={`right-step-${index}`} className={styles.rightStep}>
              <span className={styles.item}>  = </span>
              <div className={styles.MathBox}>
                <MathText content={step} />
              </div>
              <CheckIcon className={styles.item} />
            </div>
          ))}

          {
            !isFinished &&
            <div className={styles.currentStep}>
            <span className={styles.item}> = </span>
            <div className={styles.mathBox}>
              <MathTextBox
                content={currentExpression}
                onContentChange={(value) => this.handleContentChange({value, index: problemIndex })}
                onEnter={this.handleValidateStep}
              />
            </div>
            {!isValidInput ? (
              <WrongIcon className={styles.item} />
            ) : ''}

            <div id="validate-step" className={styles.item}>
              <Button onClick={this.handleValidateStep} disabled={currentExpression === ''} color="primary"> + </Button>
            </div>
          </div>
          }
          {
            isFinished &&
            <div className={styles.solvedExerciseText}>
              <Typography>Ejercicio resuelto!</Typography>
            </div>
          }
        </div>
        </div>

  {/* TODO: REFACTOR */}
  <Dialog
          onClose={this.handleSolvedDialogClose.bind(this)}
          aria-labelledby="customized-dialog-title"
          open={showFinishedExercise}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Felicitaciones!
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
             Has resuelto el ejercicio satisfactoriamente!
            </Typography>
          </DialogContent>
          <DialogActions>
          <Link className={styles.linkWithoutStyles} to={{pathname:'/',}}>
            <Button onClick={this.handleSolvedDialogClose.bind(this)} color="primary">
              Ir a la pagina principal
            </Button>
            </Link>
          </DialogActions>
        </Dialog>




      </div>
    );
  }
}

Derivative.propTypes = {
  stepList: PropTypes.array,
  className: PropTypes.string,
  isValidInput: PropTypes.bool,
  problemInput: PropTypes.string,
  currentExpression: PropTypes.string,
  onValidateStep: PropTypes.func,
  onContentChange: PropTypes.func
};

export default Derivative;
