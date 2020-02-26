import React, { Component } from 'react';
import '../../../../../../../../node_modules/react-vis/dist/style.css';
import {
  FlexibleWidthXYPlot, XAxis, YAxis, AreaSeries
} from 'react-vis';
import { CircularProgress, Select, MenuItem } from '@material-ui/core';
import BootstrapDropdownInput from '../../../../../../../bootstrap/dropdownInput';
import styles from './UsersActivityPage.module.sass';

export default class UsersActivityPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: null,
      year: null
    };
  }

  componentDidMount() {
    const { statistics, course, getCourseUsersActivity } = this.props;

    if (!statistics) {
      getCourseUsersActivity(course.courseId);
    }
  }

  onChangeYear = (event) => {
    const { statistics } = this.props;
    const { month } = this.state;

    const year = event.target.value;
    const currentMonths = statistics.find((y) => y.year === year).months;

    let newMonth;
    if (!month || (month && !currentMonths.find((m) => m.month === month))) {
      newMonth = currentMonths[0].month;
    } else {
      newMonth = month;
    }

    this.setState({ year, month: newMonth });
  }

  onChangeMonth = (event) => {
    const month = event.target.value;

    this.setState({ month });
  }

  render() {
    const { statistics } = this.props;
    const { month, year } = this.state;

    if (!statistics) {
      return (
        <div className={styles.loading}>
          <CircularProgress disableShrink />
        </div>
      );
    }
    if (!statistics.length) {
      return (
        <div>Sin estadisticas</div>
      );
    }

    const currentYear = year || statistics[0].year;
    const currentMonths = statistics.find((y) => y.year === currentYear).months;
    const currentMonth = month || currentMonths[0].month;

    const data = [
      { x: 0, y: 0 },
      ...currentMonths.find((m) => m.month === currentMonth).days.map((day) => ({ x: day.day, y: day.count }))
    ];

    return (
      <div className={styles.container}>
        <FlexibleWidthXYPlot className={styles.graph} height={400} yType="ordinal" xType="ordinal">
          <XAxis title="Día" />
          <YAxis title="Cantidad de usuarios" />
          <AreaSeries data={data} animation />
        </FlexibleWidthXYPlot>

        <div className={styles.selectors}>
          <Select
            id="year-selector"
            value={currentYear}
            className={styles.leftSelector}
            onChange={this.onChangeYear}
            input={<BootstrapDropdownInput />}
          >
            {statistics.map((actYear) => (
              <MenuItem value={actYear.year}>{actYear.year}</MenuItem>
            ))}
          </Select>
          <Select
            id="month-selector"
            value={currentMonth}
            onChange={this.onChangeMonth}
            input={<BootstrapDropdownInput />}
          >
            {currentMonths.map((actMonth) => (
              <MenuItem value={actMonth.month}>{actMonth.month}</MenuItem>
            ))}
          </Select>
        </div>
      </div>
    );
  }
}
