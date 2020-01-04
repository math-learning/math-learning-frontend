import React, { Component } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { ListItem } from '@material-ui/core';
import { AddCircleOutline } from '@material-ui/icons';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import TextListItem from './TextListItem';
import styles from './LeftPanelGuides.module.sass';

export default class LeftPanelGuides extends Component {
  constructor(props) {
    super(props);
    this.creating = this.creating.bind(this);
    this.notCreating = this.notCreating.bind(this);
    this.changeCreatingValue = this.changeCreatingValue.bind(this);
    this.state = {
      creatingNewElement: false,
      toCreateValue: '',
    };
  }

  notCreating() {
    this.setState({ creatingNewElement: false, toCreateValue: '', });
  }

  creating() {
    this.setState({ creatingNewElement: true });
  }

  create(onCreateCallback) {
    return () => {
      const { toCreateValue } = this.state;
      onCreateCallback(toCreateValue);
      this.notCreating();
    };
  }

  changeCreatingValue(e) {
    this.setState({ toCreateValue: e.target.value });
  }

  render() {
    const {
      elements, addElementText, onCreateElement, onElementUpdate, onClickActionsById,
      onDeleteElement, isProfessor
    } = this.props;
    const { creatingNewElement, value } = this.state;
    const elementsToUse = elements || [];

    let addElementComponent = '';

    if (addElementText) {
      addElementComponent = (
        <React.Fragment>
          { creatingNewElement
            && (
              <ListItem>
                <ListItemText>
                  <TextField
                    className={styles.tcGray1}
                    defaultValue={value}
                    onChange={this.changeCreatingValue}
                  />
                </ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={this.create(onCreateElement)}>
                    <DoneIcon className={styles.tcGray1} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )}
          <ListItem button onClick={this.creating}>
            <IconButton>
              {/* TODO: we should remove the padding of the iconButton */}
              <AddCircleOutline fontSize="small" className={styles.tcGray1} />
            </IconButton>
            <ListItemText className={styles.tcGray1}>
              {addElementText}
            </ListItemText>
          </ListItem>
        </React.Fragment>

      );
    }
    return (
      <React.Fragment>
        {elementsToUse.map((element) => (
          <TextListItem
            classNames={styles.guide}
            editable={isProfessor}
            key={element.id}
            text={element.name}
            onListItemClick={onClickActionsById[element.id]}
            onChangeValue={onElementUpdate(element)}
            onDeleteElement={onDeleteElement(element)}

          />
        ))}
        {
          isProfessor
          && addElementComponent
        }
        {/* TODO: we should hide the add component while the guide is being modified */}
      </React.Fragment>
    );
  }
}
