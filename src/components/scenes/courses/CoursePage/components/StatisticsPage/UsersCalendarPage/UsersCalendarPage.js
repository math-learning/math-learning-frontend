import React, { Component } from 'react';
import classNames from 'classnames';
import '../../../../../../../../node_modules/react-vis/dist/style.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import { CircularProgress } from '@material-ui/core';
import styles from '../StatisticsCommon.module.sass';
import particularStyles from './UsersCalendarPage.module.sass';

const previousMonthsToAnalyze = 8;
const daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
const monthsOfYear = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ag', 'Sept', 'Oct', 'Nov', 'Dic'];

export default class UsersCalendarPage extends Component {
  componentDidMount() {
    const { statistics, course, getCourseUsersActivity } = this.props;

    if (!statistics) {
      getCourseUsersActivity(course.courseId);
    }
  }

  getCurrentData = () => {
    const { statistics } = this.props;
    let daysWithCount = [];

    // analyze if we should take data from previous year
    const today = new Date();
    const lastYear = statistics[1];
    if (today.getMonth() < previousMonthsToAnalyze && lastYear) {
      const monthsToAnalyze = lastYear.months.filter((m) => m.month > 11 - today.getMonth());
      const daysData = monthsToAnalyze.reduce((acum, month) => (
        [...acum, ...this.extractDaysWithCountFromMonth(lastYear.year, month)]
      ), []);
      daysWithCount = [...daysWithCount, ...daysData];
    }

    // data from current year
    const currentYear = statistics[0];
    const { months } = currentYear;

    const daysData = months.reduce((acum, month) => (
      [...acum, ...this.extractDaysWithCountFromMonth(currentYear.year, month)]
    ), []);
    daysWithCount = [...daysWithCount, ...daysData];

    return daysWithCount;
  }

  extractDaysWithCountFromMonth = (year, month) => {
    const { days } = month;

    const daysWithCount = [];
    days.forEach((day) => {
      if (day.count > 0) {
        daysWithCount.push({
          date: `${year}-${month.month}-${day.day}`,
          count: day.count
        });
      }
    });

    return daysWithCount;
  };

  calculateDensity = (dayActivity) => {
    const { users } = this.props;
    const amountOfUsers = users.length;

    if (!dayActivity) {
      return particularStyles.emptyDensity;
    }
    if (dayActivity.count < (amountOfUsers * 0.25)) {
      return particularStyles.lightDensity;
    }
    if (dayActivity.count < (amountOfUsers * 0.5)) {
      return particularStyles.mediumDensity;
    }
    if (dayActivity.count < (amountOfUsers * 0.75)) {
      return particularStyles.hightDensity;
    }
    return particularStyles.fullDensity;
  }

  render() {
    const { statistics } = this.props;

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

    const endDate = new Date();
    endDate.setMonth(endDate.getMonth());
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - previousMonthsToAnalyze);

    console.log('DAYS', this.getCurrentData(statistics))

    return (
      <div className={classNames(styles.container, particularStyles.container)}>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          showWeekdayLabels
          values={this.getCurrentData(statistics)}
          classForValue={this.calculateDensity}
          titleForValue={(value) => value && `${value.date}: ${value.count}`}
          weekdayLabels={daysOfWeek}
          monthLabels={monthsOfYear}
        />
      </div>
    );
  }
}
