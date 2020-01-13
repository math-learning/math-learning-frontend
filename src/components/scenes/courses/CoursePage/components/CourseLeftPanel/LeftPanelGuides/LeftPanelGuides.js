import React, { Component } from 'react';
import {
  IconButton, ListItemText, ListItem, CircularProgress, Typography
} from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import TextListItem from '../TextListItem';
import styles from './LeftPanelGuides.module.sass';

export default class LeftPanelGuides extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreatingGuide: false,
      guideNameToCreate: ''
    };
  }

  setStateToNotCreating = () => {
    this.setState({ isCreatingGuide: false, guideNameToCreate: '' });
  }

  setStateToCreating = () => {
    this.setState({ isCreatingGuide: true });
  }

  changeCreatingValue = (e) => {
    this.setState({ guideNameToCreate: e.target.value });
  }

  handlePressKeyDone = (event) => {
    if (event.which === 13) {
      this.handleCreateGuide();
    }
  }

  handleCreateGuide = () => {
    const { guideNameToCreate } = this.state;
    const { courseId, onCreateGuide, guides } = this.props;

    if (this.validateGuideName(guideNameToCreate, guides)) {
      onCreateGuide({
        courseId,
        name: guideNameToCreate,
        description: 'description'
      });
      this.setStateToNotCreating();
    }
  }

  handleUpdateGuide = (guide, value) => {
    const { onUpdateGuide } = this.props;

    onUpdateGuide({
      ...guide,
      name: value,
      description: guide.description
    });
  }

  handleDeleteGuide = (guide) => {
    const { onDeleteGuide } = this.props;

    onDeleteGuide(guide);
  }

  handleClickGuide = (guide) => {
    const { onSelectGuide } = this.props;

    onSelectGuide(guide);
  }

  validateCanUpdate = (guide, value) => {
    const { guides } = this.props;
    const currentGuides = guides.filter(($guide) => $guide.guideId !== guide.guideId);

    return this.validateGuideName(value, currentGuides);
  }

  validateGuideName(name, currentGuides) {
    return name && !currentGuides.find((guide) => (
      name.toLowerCase().replace(' ', '') === guide.name.toLowerCase().replace(' ', '')
    ));
  }

  render() {
    const { guides, isProfessor, isLoadingCreatingGuide } = this.props;
    const { isCreatingGuide, value } = this.state;
    const shouldRenderCreatingGuide = (isCreatingGuide || isLoadingCreatingGuide);

    return (
      <React.Fragment>
        <ListItem>
          <Typography>Guias</Typography>
        </ListItem>
        {(guides || []).map((guide) => (
          <TextListItem
            key={guide.guideId}
            className={styles.guide}
            isEditable={isProfessor}
            element={guide}
            validateCanUpdate={this.validateCanUpdate}
            onUpdateElementValue={this.handleUpdateGuide}
            onClickElement={this.handleClickGuide}
            onDeleteElement={this.handleDeleteGuide}
          />
        ))}
        {isProfessor && shouldRenderCreatingGuide && (
          <ListItem>
            <ListItemText>
              <TextField
                className={styles.tcGray1}
                defaultValue={value}
                onChange={this.changeCreatingValue}
                onKeyPress={this.handlePressKeyDone}
              />
            </ListItemText>
            {!isLoadingCreatingGuide && (
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={this.handleCreateGuide}>
                  <DoneIcon className={styles.tcGray1} />
                </IconButton>
              </ListItemSecondaryAction>
            )}
            {isLoadingCreatingGuide && (
              <CircularProgress className={styles.loadingCreatingGuide} size="25px" disableShrink />
            )}
          </ListItem>
        )}
        {isProfessor && !shouldRenderCreatingGuide && (
          <ListItem button onClick={this.setStateToCreating}>
            <IconButton>
              <AddCircleOutline fontSize="small" className={styles.tcGray1} />
            </IconButton>
            <ListItemText className={styles.tcGray1}>
              Agregar Guía
            </ListItemText>
          </ListItem>
        )}
      </React.Fragment>
    );
  }
}
