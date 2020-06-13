import React, { Component } from 'react';
import _ from 'lodash';
import '../../../../../../../../node_modules/react-vis/dist/style.css';
import {
  FlexibleWidthXYPlot, XAxis, YAxis, VerticalBarSeries, RadialChart, LabelSeries
} from 'react-vis';
import {
  CircularProgress, Select, MenuItem, Typography
} from '@material-ui/core';
import BootstrapDropdownInput from '../../../../../../../bootstrap/dropdownInput';
import EmptyStatePage from '../../../../../../common/containers/EmptyStatePage';
import styles from '../StatisticsCommon.module.sass';

const graphicTypes = ['Histograma', 'Torta'];
const errorSumTypes = ['Todos', 'Promedio'];

export default class AvgExerciseErrorsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guideId: null,
      errorSumType: 'Todos',
      graphicType: 'Histograma'
    };
  }

  componentDidMount() {
    const { statistics, course, getCourseExerciseErrors } = this.props;

    if (!statistics) {
      getCourseExerciseErrors(course.courseId);
    }
  }

  calculateCount = (obj) => {
    const { users } = obj;
    const { errorSumType } = this.state;
    const totalUsers = users.length;

    if (errorSumType === 'Promedio') {
      return Number((obj.count / totalUsers).toFixed(2));
    }
    return obj.count;
  }

  renderGraphic = () => {
    const { statistics } = this.props;
    const { graphicType, errorSumType, guideId } = this.state;
    const currentGuide = guideId || statistics[0].guideId;

    let objsToRender;
    if (currentGuide === 'Todas') {
      objsToRender = statistics.map((guide) => {
        const count = guide.exercises.reduce((acum, ex) => (acum + ex.count), 0);
        const users = _.uniq(guide.exercises.reduce((acum, ex) => ([...acum, ...ex.users]), []));
        return ({ name: guide.guideId, count, users });
      });
    } else {
      objsToRender = statistics.find((guide) => guide.guideId === currentGuide).exercises;
    }

    if (graphicType === 'Histograma') {
      const data = objsToRender.map((obj) => ({ x: obj.name, y: this.calculateCount(obj) }));

      return (
        <FlexibleWidthXYPlot
          className={styles.graph}
          height={400}
          xType="ordinal"
          margin={{ bottom: 100 }}
        >
          <XAxis tickLabelAngle={-45} />
          <YAxis title={`${errorSumType === 'Todos' ? 'Cantidad' : 'Promedio'} de errores`} />
          <VerticalBarSeries data={data} animation barWidth={0.1} />
          <LabelSeries data={data.map((d) => ({ ...d, label: d.y, xOffset: 15 }))} />
        </FlexibleWidthXYPlot>
      );
    }

    const data = objsToRender.map((obj) => ({
      label: `${obj.name}: ${this.calculateCount(obj)}`,
      angle: this.calculateCount(obj)
    }));

    return (
      <RadialChart
        className={styles.radialGraph}
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

  onChangeErrorSumType = (event) => {
    const errorSumType = event.target.value;

    this.setState({ errorSumType });
  }

  renderSelector = ({ title, value, onChange, values }) => (
    <div className={styles.selector}>
      <Typography className={styles.labelSelector} variant="h6" color="textSecondary">{title}</Typography>

      <Select
        id={`selector-${title}`}
        value={value}
        className={styles.leftSelector}
        onChange={onChange}
        input={<BootstrapDropdownInput />}
      >
        {values}
      </Select>
    </div>
  );

  render() {
    const { statistics } = this.props;
    const { guideId, graphicType, errorSumType } = this.state;

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

    const currentGraphic = graphicType;
    const currentErrorSumType = errorSumType;
    const currentGuide = guideId || statistics[0].guideId;

    return (
      <div className={styles.container}>
        <div className={styles.selectors}>
          {this.renderSelector({
            title: 'Guía:',
            value: currentGuide,
            onChange: this.onChangeGuide,
            values: [
              ...statistics.map((g) => <MenuItem key={g.guideId} value={g.guideId}>{g.guideId}</MenuItem>),
              <MenuItem key="Todas" value="Todas">Todas</MenuItem>
            ]
          })}
          {this.renderSelector({
            title: 'Tipo de gráfico:',
            value: currentGraphic,
            onChange: this.onChangeGraphicType,
            values: graphicTypes.map((gt) => (<MenuItem key={gt} value={gt}>{gt}</MenuItem>))
          })}
          {this.renderSelector({
            title: 'Tipo de cuenta:',
            value: currentErrorSumType,
            onChange: this.onChangeErrorSumType,
            values: errorSumTypes.map((gt) => (<MenuItem key={gt} value={gt}>{gt}</MenuItem>))
          })}
        </div>

        {this.renderGraphic()}
      </div>
    );
  }
}
