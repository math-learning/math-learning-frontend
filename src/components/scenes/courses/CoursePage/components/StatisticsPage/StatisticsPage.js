import React, { Component } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import UsersCalendarPage from './UsersCalendarPage';
import ExerciseErrorsPages from './ExerciseErrorsPages';

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
      return <UsersCalendarPage course={course} />;
    }

    return <ExerciseErrorsPages course={course} />;
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
        </Tabs>

        {this.renderStatisticPage()}
      </React.Fragment>
    );
  }
}
