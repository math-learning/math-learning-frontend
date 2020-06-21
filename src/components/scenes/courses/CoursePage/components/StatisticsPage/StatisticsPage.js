import React, { Component } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import ActivityPage from './ActivityPage';
import ExerciseErrorsPage from './ExerciseErrorsPage';
import ExerciseStepCountPage from './ExerciseStepCountPage';

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStatistic: 0
    };
  }

  renderStatisticPage = () => {
    const { course } = this.props;
    const { selectedStatistic } = this.state;

    if (selectedStatistic === 0) {
      return <ActivityPage course={course} />;
    }
    if (selectedStatistic === 1) {
      return <ExerciseErrorsPage course={course} />;
    }
    return <ExerciseStepCountPage course={course} />;
  }

  handleChange = (event, newValue) => {
    this.setState({ selectedStatistic: newValue });
  }

  render() {
    const { selectedStatistic } = this.state;

    return (
      <React.Fragment>
        <Tabs
          value={selectedStatistic}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Actividad de usuarios" />
          <Tab label="Errores por ejercicio" />
          <Tab label="Promedio de pasos por ejercicio" />
        </Tabs>

        {this.renderStatisticPage()}
      </React.Fragment>
    );
  }
}
