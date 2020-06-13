import React from 'react';
import '../../../../../../../../node_modules/react-vis/dist/style.css';
import { CircularProgress } from '@material-ui/core';
import EmptyStatePage from '../../../../../../common/containers/EmptyStatePage';
import BaseExerciseStatisticPage from '../BasicExerciseStatisticPage';
import styles from '../StatisticsCommon.module.sass';

export default class ExerciseStepCountPage extends BaseExerciseStatisticPage {
  constructor(props) {
    super(props);

    this.state = {
      guideId: null,
      sumType: 'Promedio',
      graphicType: 'Histograma'
    };
  }

  componentDidMount() {
    const { statistics, course, getCourseExerciseStepCount } = this.props;

    if (!statistics) {
      getCourseExerciseStepCount(course.courseId);
    }
  }

  onChangeGuide = (event) => {
    const guideId = event.target.value;

    this.setState({ guideId });
  }

  onChangeGraphicType = (event) => {
    const graphicType = event.target.value;

    this.setState({ graphicType });
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
        </div>

        {this.renderGraphic()}
      </div>
    );
  }
}
