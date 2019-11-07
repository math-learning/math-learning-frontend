import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import LeftPanelElements from "./LeftPanelElements";
import styles from './LeftPanel.module.sass';
import {Divider, List, ListItem, Typography} from "@material-ui/core";

export default class LeftPanel extends Component {

    render() {
        return (
            <Grid className={styles.leftPanel} item xs={12} sm={3} md={2}>
                <List>
                    {this.props.children}
                </List>
            </Grid>
        )
    }
}
