import React, { Component } from 'react';
import styles from "../../../CoursePage/CoursePage.module.sass";
import LinkListItem from "../../../LinkListItem";


export default class LeftPanelElements extends Component {
    render() {
        let { elements } = this.props;
        elements = elements || [];
        return (
            <React.Fragment>
                {elements.map( element => {
                    return (
                        <LinkListItem
                            className={styles.textCenter}
                            path={element.path}
                            icon={element.icon}
                            text={element.text}
                            editable={element.editable}
                        />)
                })}
            </React.Fragment>
        )
    }
}
