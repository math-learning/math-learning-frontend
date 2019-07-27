import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './ExerciseCard.css';
import MathText from '../MathText'

class ExerciseCard extends Component {

    // TODO: analyze how to do this better
    state = {
        hovered: false
    }

    setHoveredTrue = () => {
        this.setState({hovered: true})
    }

    setHoveredFalse = () => {
        this.setState({hovered: false})
    }

    render() {
        const {finished} = this.props
        return (
            <Card className="card" raised={this.state.hovered}
                onMouseEnter={this.setHoveredTrue}
                onMouseLeave={this.setHoveredFalse}
            >
                <CardContent>
                    <Typography className="title" color="textSecondary" gutterBottom>
                        {this.props.title}
                    </Typography>
                
                    <Typography className="statement" variant="body2" component="p">
                        <MathText content={this.props.statement}/>
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

}


export default ExerciseCard;