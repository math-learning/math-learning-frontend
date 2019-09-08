import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core';
import MathText from '../MathText';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function ExerciseCard(props) {
  const [state, setState] = React.useState({
    raised: false,
  });

  const { raised } = state;

  const onMouseEnter = () => {
    setState({ ...state, raised: true });
  };

  const onMouseLeave = () => {
    setState({ ...state, raised: false });
  };

  const classes = useStyles();
  // TODO: analyze how to do this better
  const { finished, title, statement } = props;
  return (
    <Card
      className={classes.card}
      raised={raised}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >

      <CardContent className={classes.cardContent}>
        <Typography className="title" color="textPrimary" gutterBottom>
          {title}
        </Typography>

        <Typography className="statement" color="textSecondary" variant="body2" component="p">
          <MathText content={statement} />
        </Typography>
      </CardContent>
      {
                finished
                && (
                <div className="finished-text">
                  <Typography>
                        Ejercicio resuelto
                  </Typography>
                </div>
                )
            }
    </Card>
  );
}
