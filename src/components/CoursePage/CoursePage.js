import {
  Container, Divider, Grid, List, ListItem, Typography
} from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import React, { Component } from 'react';

import InteractiveLinkCard from '../InteractiveLinkCard/InteractiveLinkCard';
import LinkListItemWithIcon from '../LinkListItemWithIcon';
import MathText from '../MathText';
import styles from './CoursePage.module.sass';

// TODO: Remove eslint-disable and fix them
const modules = new Map();

modules.set('derivadas',
  {
    name: 'Derivadas',
    id: 'derivadas',
    number: 1,
    exercises: [
      {
        text: 'resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2',
        exercise: 'TODO',
        difficulty: 'HARD',
        status: 'TODO',
        name: 'e + sen',
        input: '\\frac{d\\left(e^x \\cdot \\ x\\right)}{dx}\\ +\\ \\frac{d\\left(sen\\left(x\\right)\\cdot x^2\\right)}{dx}',
        result: 'e^x\\cdot \\left(1 +x\\right)+ \\cos \\left(x\\right)\\cdot x^2+\\sin \\left(x\\right)\\cdot 2\\cdot x',
      },
      {
        text: 'resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2',
        exercise: 'TODO',
        difficulty: 'INTERMEDIATE',
        status: 'DONE',
        name: 'deriv suma x + x2 + cos',
        input: '\\frac{d\\left(x^2+x\\ +\\cos \\left(x\\right)\\right)}{dx}',
        result: '2*x+1-\\sin(x)',
      },
      {
        text: 'resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2',
        exercise: 'TODO',
        difficulty: 'EASY',
        status: 'TODO',
        name: 'sen / cos',
        input: '\\frac{d(\\frac{sen(x)}{\\cos(x)})} {dx}',
        result: '\\frac{1}{\\cos\\left(x\\right)^2}',
      },
      {
        text: 'resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2',
        exercise: 'TODO',
        difficulty: 'HARD',
        status: 'TODO',
        name: 'deriv of a constant',
        input: '\\frac{d(\\frac{ \\frac{d(sen(x))}{dx}}{\\cos(x)})} {dx}',
        // TODO:
        result: '0',

      },
      {
        text: 'resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2',
        exercise: 'TODO',
        difficulty: 'HARD',
        status: 'TODO',
        name: '2 derivatives',
        input: ' \\frac{d\\left(  \\frac{d\\left(e^x\\right)}{dx} \\right)}{dx}',
        result: 'e^x',
      },
      {
        text: 'resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2',
        exercise: 'TODO',
        difficulty: 'HARD',
        status: 'TODO',
        name: ' e ',
        input: '\\frac{d\\left(e^x\\right)}{dx}',
        result: 'e^x',
      },
      {
        text: 'resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2',
        exercise: 'TODO',
        difficulty: 'HARD',
        status: 'TODO',
        name: 'function composition',
        input: '\\frac{d\\left(      \\sin(\\cos(x))         \\right)}{dx}',
        result: '-\\cos (\\cos (x)) \\cdot \\sin(x)',

      },
      {
        text: 'resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2',
        exercise: 'TODO',
        difficulty: 'HARD',
        status: 'TODO',
        name: 'multiplication of 3 elem',
        input: '\\frac{d\\left(x^2 \\cdot \\sin(x) \\cdot \\cos \\left(x\\right)\\right)}{dx}',
        // TODO
        result: '\\frac{d\\left(e^3  \\cdot x \\right)}{dx}',

      },
      {
        text: 'resuelva paso a paso la derivada de f(x) siendo f(x) = x + 2',
        exercise: 'TODO',
        difficulty: 'HARD',
        status: 'TODO',
        name: 'constant times x',
        input: '\\frac{d\\left(e^3  \\cdot x \\right)}{dx}',
        result: 'e^3',
      },

    ]
  });

modules.set('integrales', {
  name: 'Integrales',
  id: 'integrales',
  number: 2,
  exercises: [
    {
      text: 'resuelva paso a paso la integral de f(x) siendo f(x) = x + 2',
      exercise: 'TODO',
      difficulty: 'Dificil',
      status: 'TODO'
    }

  ]
});

const courses = new Map();
courses.set(
  'hash',
  {
    name: 'Analisis II A - Curso 3',
    id: 'hash',
    modules
  }
);

function resolveDifficultyText(difficulty) {
  switch (difficulty) {
    case 'EASY':
      return (<Typography>Facil</Typography>);
    case 'INTERMEDIATE':
      return (<Typography>Intermedio</Typography>);
    default:
      return (<Typography>Dificil</Typography>);
  }
}

function resolveStatusText(status) {
  switch (status) {
    case 'DONE':
      return (
        <DoneAllIcon className={styles.tcAquamarine} />
      );
    default:
      return ('');
  }
}

export default class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses
    };
  }

  render() {
    const { courseId, moduleId } = this.props;
    const { courses } = this.state; // eslint-disable-line
    const currentCourse = courses.get(courseId);
    const { modules } = currentCourse; // eslint-disable-line
    const currentModule = (moduleId !== null && moduleId !== undefined) ? modules.get(moduleId) : modules.values().next().value;
    const { exercises } = currentModule;

    const amountCompleted = exercises.reduce((accum, elem) => (elem.status === 'DONE' ? accum + 1 : accum), 0);
    const finishPercentage = parseInt((amountCompleted / exercises.length) * 100); // eslint-disable-line

    return (
      <Grid container className={styles.root}>
        {/* LEFT PANEL */}
        <Grid item sm={4} md={2} className={styles.leftPanel} xs={12}>
          <List>
            <ListItem>
              <Typography className={styles.leftPanelTitle}>
                {/* TODO: title */}
                {currentCourse.name}
              </Typography>
            </ListItem>

            <div className={styles.divider}>
              <Divider variant="middle" />
            </div>
            {Array.from(modules.values()).map((module) => {
              console.log(module);
              return (<LinkListItemWithIcon className={styles.textCenter} path={`/my-courses/${currentCourse.id}/modules/${module.id}`} icon={`Guia ${module.number}:`} text={module.name} />);
            })}
          </List>
        </Grid>

        {/* Main Content */}
        <Grid item sm={8} md={10} xs={12}>
          <Container className={styles.defaultContainer} maxWidth="md">

            <Typography variant="h4" color="primary" className={styles.title}>
              {/* TODO: PERCENTAGE */}
              {currentModule.name}
              {' '}
[
              {finishPercentage}
%]
            </Typography>

            <Grid container spacing={3}>
              {exercises.map((exercise) => (
                <Grid item xs={12}>

                  <InteractiveLinkCard className={styles.exercise} path="/">
                    <Grid container>
                      <Grid item xs={12} sm={7} md={9}>
                        {/* TODO: ver como mechar expresiones y texto */}
                        <Typography>Resuelva paso a paso la siguiente derivada:</Typography>
                        <MathText content={exercise.input} />
                      </Grid>
                      <Grid item xs={6} sm={4} md={2}>
                        <Typography className={styles.textCenter}>
                          {
                            resolveDifficultyText(exercise.difficulty)
                          }
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={1} md={1}>
                        <Typography className={styles.textCenter}>
                          {resolveStatusText(exercise.status)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </InteractiveLinkCard>
                </Grid>
              ))}
            </Grid>

          </Container>
        </Grid>

      </Grid>
    );
  }
}
