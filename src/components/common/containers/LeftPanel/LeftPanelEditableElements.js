import React, { Component } from 'react';
import EditableTextListItem from "./EditableTextListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import {ListItem} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import DoneIcon from "@material-ui/icons/Done";
import styles from '../../../../App.module.sass'

export default class LeftPanelEditableElements extends Component {

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

    create( onCreateCallback ) {
        return () => {
            onCreateCallback(this.state.toCreateValue);
            this.notCreating();
        }
    }

    changeCreatingValue(e) {
        this.setState({ toCreateValue: e.target.value });
    }


    render() {
        let { elements, addElementText, onCreateElement, onElementUpdate, onClickActionsById } = this.props;
        elements = elements || [];

        let addElementComponent = '';

        if (addElementText) {
            addElementComponent = (
                <React.Fragment>
                    {   this.state.creatingNewElement ?
                        <ListItem button={false}>
                            <ListItemText>
                                <TextField
                                    className={styles.tcGray1}
                                    defaultValue={this.state.value}
                                    onChange={this.changeCreatingValue}/>
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton edge="end">
                                    <DoneIcon className={styles.tcGray1} onClick={this.create(onCreateElement)}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        : ''
                    }
                    <ListItem button onClick={this.creating}>
                        <IconButton>
                            <AddCircleOutline className={styles.tcGray1}/>
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
                {elements.map( element => {
                    return (
                        <EditableTextListItem
                            text={element.name}
                            onListItemClick={onClickActionsById[element.id]}
                            onChangeValue={onElementUpdate(element)}
                        />)
                })}
                {addElementComponent}
            </React.Fragment>
        )
    }
}
