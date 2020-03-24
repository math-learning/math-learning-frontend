import React, { Component } from 'react';
import '../../../../../../../../node_modules/react-vis/dist/style.css';
import {
  FlexibleWidthXYPlot, XAxis, YAxis, VerticalBarSeries, RadialChart
} from 'react-vis';
import {
  CircularProgress, Select, MenuItem, Typography
} from '@material-ui/core';
import BootstrapDropdownInput from '../../../../../../../bootstrap/dropdownInput';
import styles from '../StatisticsCommon.module.sass';

const graphicTypes = ['Histograma', 'Torta'];

export default class ExerciseErrorsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guideId: null,
      graphicType: 'Histograma'
    };
  }

  componentDidMount() {
    const { statistics, course, getCourseExerciseErrors } = this.props;

    if (!statistics) {
      getCourseExerciseErrors(course.courseId);
    }
  }

  renderGraphic = () => {
    const { statistics } = this.props;
    const { graphicType, guideId } = this.state;
    const currentGuide = guideId || statistics[0].guideId;

    let objsToRender;
    if (currentGuide === 'Todas') {
      objsToRender = statistics.map((guide) => {
        const count = guide.exercises.reduce((acum, ex) => (acum + ex.count), 0);
        return ({ name: guide.guideId, count });
      });
    } else {
      objsToRender = statistics.find((guide) => guide.guideId === currentGuide).exercises;
    }

    if (graphicType === 'Histograma') {
      const data = objsToRender.map((obj) => ({ x: obj.name, y: obj.count }));

      return (
        <FlexibleWidthXYPlot
          className={styles.graph}
          height={400}
          xType="ordinal"
          margin={{ bottom: 100 }}
        >
          <XAxis tickLabelAngle={-45} />
          <YAxis title="Cantidad de errores" />
          <VerticalBarSeries data={data} animation barWidth={0.1} />
        </FlexibleWidthXYPlot>
      );
    }

    const data = objsToRender.map((obj) => ({
      label: `${obj.name}: ${obj.count}`,
      angle: obj.count
    }));

    return (
      <RadialChart
        height={400}
        width={400}
        data={data}
        showLabels
        labelsStyle={{
          fontSize: 12,
          letterSpacing: 0.4,
          fill: 'white'
        }}
      />
    );
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
    const { guideId, graphicType } = this.state;

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

    const currentGraphic = graphicType;
    const currentGuide = guideId || statistics[0].guideId;

    return (
      <div className={styles.container}>
        <div className={styles.selectors}>
          <div className={styles.selector}>
            <Typography className={styles.labelSelector} variant="h6" color="textSecondary">Guía:</Typography>

            <Select
              id="guide-selector"
              value={currentGuide}
              className={styles.leftSelector}
              onChange={this.onChangeGuide}
              input={<BootstrapDropdownInput />}
            >
              {[
                ...statistics.map((g) => <MenuItem key={g.guideId} value={g.guideId}>{g.guideId}</MenuItem>),
                <MenuItem key="Todas" value="Todas">Todas</MenuItem>
              ]}
            </Select>
          </div>
          <div className={styles.selector}>
            <Typography className={styles.labelSelector} variant="h6" color="textSecondary">Tipo de gráfico:</Typography>

            <Select
              id="graphic-selector"
              value={currentGraphic}
              className={styles.leftSelector}
              onChange={this.onChangeGraphicType}
              input={<BootstrapDropdownInput />}
            >
              {graphicTypes.map((gt) => (<MenuItem key={gt} value={gt}>{gt}</MenuItem>))}
            </Select>
          </div>
        </div>

        {this.renderGraphic()}
      </div>
    );
  }
}
