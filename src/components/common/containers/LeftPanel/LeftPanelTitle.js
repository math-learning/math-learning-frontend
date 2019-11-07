import React, { Component } from 'react';
import styles from "../../../CoursePage/CoursePage.module.sass";
import {Typography} from "@material-ui/core";
import clsx from "clsx";

export default class LeftPanelTitle extends Component {
    render() {
        const { text, className } = this.props;

        return (
            <div>
                <Typography className={clsx(styles.leftPanelTitle, className)}>
                    {text}
                </Typography>
            </div>
        )
    }
}
