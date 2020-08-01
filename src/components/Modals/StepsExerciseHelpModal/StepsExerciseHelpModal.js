import React, { Component } from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import MathTextBox from '../../common/math/MathTextBox';
import BootstrapDropdownInput from '../../../bootstrap/dropdownInput';
import styles from './StepsExerciseHelpModal.module.sass';

class StepsExerciseHelpModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      helpIndex: 0
    };
  }

  onUpgradeHelpIndex = () => {
    const { helpIndex } = this.state;

    this.setState({ helpIndex: helpIndex + 1 });
  };

  onDowngradeHelpIndex = () => {
    const { helpIndex } = this.state;

    this.setState({ helpIndex: helpIndex - 1 });
  };

  render() {
    const { onClose, onActionClick } = this.props;
    const { helpIndex } = this.state;

    return (
      <Modal className={styles.modal} onClose={onClose}>
        {helpIndex === 0 && (
          <div>
            <Typography id="creation-label" color="textPrimary" variant="h5">
              Para resolver estos tipos de ejercicios tienes dos opciones
            </Typography>
            <Typography id="creation-label" color="textPrimary" variant="body1" className={classNames(styles.textExplanation, styles.text)}>
              La primera es realizar el ejercicio por tu cuenta y escribir el resultado final en el cuadro de texto y validarlo
            </Typography>
            <img src={require('../../../images/mathTextBox.png')} className={styles.mathTextBoxImg} />
            <Typography id="creation-label" color="textPrimary" variant="body1" className={classNames(styles.textExplanation, styles.text)}>
              Si no estás muy seguro cómo resolverlo, puedes escribir paso a paso su resolución y te ayudaremos a resolverlo juntos
            </Typography>
          </div>
        )}
        {helpIndex === 1 && (
          <div className={styles.mathCalcContainer}>
            <img src={require('../../../images/mathcalc.png')} className={styles.mathCalc} />
            <div className={styles.mathCalcExplanation}>
              <Typography id="creation-label" color="textPrimary" variant="body1" className={classNames(styles.textExplanation, styles.text)}>
                La calculadora de símbolos te ayudará a escribir algunos símbolos que son difíciles
                de escribir.
              </Typography>
              <Typography id="creation-label" color="textPrimary" variant="body1" className={classNames(styles.textExplanation, styles.text)}>
                También se puede cambiar el modo de escritura a latex
              </Typography>
            </div>
          </div>
        )}
        {helpIndex === 2 && (
          <div className={styles.exerciseHelpContainer}>
            <img src={require('../../../images/exerciseHelp.png')} className={styles.exerciseHelpImg} />
            <div className={styles.exerciseHelpExplanation}>
              <Typography id="creation-label" color="textPrimary" variant="body1" className={classNames(styles.textExplanation, styles.text)}>
                Si cometiste un error, estás trabado o tienes dudas de cómo continuar, consulta las ayudas del ejercicio
              </Typography>
            </div>
          </div>
        )}
        {helpIndex === 3 && (
          <div className={styles.addVariableContainer}>
            <img src={require('../../../images/addVariable.png')} className={styles.addVariableImg} />
            <div className={styles.addVariableExplanation}>
              <Typography id="creation-label" color="textPrimary" variant="body1" className={classNames(styles.textExplanation, styles.text)}>
                Si estás resolviendo integrales y te toca utilizar el método de sustitución
                o por partes, no te olvides de agregar las variables que correspondan!!
              </Typography>
            </div>
          </div>
        )}
        {helpIndex === 4 && (
          <div>
            <Typography id="creation-label" color="textPrimary" variant="body1" className={classNames(styles.textExplanation, styles.text)}>
              Si quieres obtener más información de cómo resolver un ejercicio, visita nuestra demo online
            </Typography>
            <Typography id="creation-label" color="textPrimary" variant="body1" className={styles.text}>
              <a target="_blank" href="https://www.youtube.com/watch?v=ukF4KCdpjCc">
                Demo de resolución de un ejercicio
              </a>
            </Typography>
          </div>
        )}

        <div className={styles.buttonContainer}>
          <Button
            color="grey"
            variant="contained"
            id="create-exercise-button"
            onClick={this.onDowngradeHelpIndex}
            size="large"
            disabled={helpIndex === 0}
            className={styles.backButton}
          >
            Atrás
          </Button>
          <Button
            color="primary"
            variant="contained"
            id="create-exercise-button"
            onClick={this.onUpgradeHelpIndex}
            size="large"
            disabled={helpIndex === 4}
            className={styles.button}
          >
            Continuar
          </Button>
        </div>
      </Modal>
    );
  }
}

export default StepsExerciseHelpModal;
