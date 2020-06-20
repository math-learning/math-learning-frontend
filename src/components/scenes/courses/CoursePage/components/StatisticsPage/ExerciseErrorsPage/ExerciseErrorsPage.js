import React from 'react';
import '../../../../../../../../node_modules/react-vis/dist/style.css';
import { CircularProgress } from '@material-ui/core';
import EmptyStatePage from '../../../../../../common/containers/EmptyStatePage';
import BaseExerciseStatisticPage from '../BasicExerciseStatisticPage';
import styles from '../StatisticsCommon.module.sass';

export default class AvgExerciseErrorsPage extends BaseExerciseStatisticPage {
  componentDidMount() {
    const { statistics, course, getCourseExerciseErrors } = this.props;

    if (!statistics) {
      getCourseExerciseErrors(course.courseId);
    }
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
        <EmptyStatePage
          title="No existen estadísticas aún."
          subtitle="Tus alumnos deberán utilizar más el curso para que aparezcan"
        />
      );
    }

    return (
      <div className={styles.container}>
        <div className={styles.selectors}>
          {this.renderGuidesSelector()}
          {this.renderGraphicTypeSelector()}
          {this.renderCountTypeSelector()}
          {this.renderUserSelector()}
        </div>
        {this.renderGraphic()}
      </div>
    );
  }
}
