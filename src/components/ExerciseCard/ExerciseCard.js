import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import MathText from '../MathText'
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    cardContent: {
        flexGrow: 1,
    },
}));


export default function ExerciseCard(props) {
    const classes = useStyles()
    // TODO: analyze how to do this better
    const { finished, title, statement } = props
    return (
        <Card className="card"
            className={classes.card}
        >
            <CardContent className={classes.cardContent}>
                <Typography className="title" color="textPrimary" gutterBottom>
                    {title}
                </Typography>

                <Typography className="statement" color="textSecondary"variant="body2" component="p">
                    <MathText content={statement} />
                </Typography>
            </CardContent>
            {
                finished &&
                <div className="finished-text">
                    Ejercicio resuelto
                            </div>
            }
        </Card>
    )
}
