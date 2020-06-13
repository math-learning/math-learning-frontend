import React, { Component } from 'react';
import _ from 'lodash';
import '../../../../../../../../node_modules/react-vis/dist/style.css';
import {
  FlexibleWidthXYPlot, XAxis, YAxis, VerticalBarSeries, RadialChart, LabelSeries
} from 'react-vis';
import { MenuItem, Select, Typography } from '@material-ui/core';
import BootstrapDropdownInput from '../../../../../../../bootstrap/dropdownInput';
import EmptyStatePage from '../../../../../../common/containers/EmptyStatePage';
import styles from '../StatisticsCommon.module.sass';

export default class BasicExerciseStatisticPage extends Component {
  graphicTypes = ['Histograma', 'Torta']

  sumTypes = ['Todos', 'Promedio']

  constructor(props) {
    super(props);

    this.state = {
      guideId: null,
      sumType: 'Todos',
      graphicType: 'Histograma'
    };
  }

  calculateCount = (obj) => {
    const { users } = obj;
    const { sumType } = this.state;
    const totalUsers = users.length;

    if (sumType === 'Promedio') {
      return Number((obj.count / totalUsers).toFixed(2));
    }
    return obj.count;
  }

  renderGraphic = () => {
    const { statistics } = this.props;
    const { graphicType, guideId } = this.state;
    const currentGuide = guideId || statistics[0].guideId;

    let objsToRender;
    if (currentGuide === 'Todos') {
      objsToRender = statistics.map((guide) => {
        const count = guide.exercises.reduce((acum, ex) => (acum + ex.count), 0);
        const users = _.uniq(guide.exercises.reduce((acum, ex) => ([...acum, ...ex.users]), []));
        return ({ name: guide.guideId, count, users });
      });
    } else {
      objsToRender = statistics.find((guide) => guide.guideId === currentGuide).exercises;
    }

    if (graphicType === 'Histograma') {
      return this.renderHistogramGraphic(objsToRender);
    }
    return this.renderCakeDiagram(objsToRender);
  }

  renderHistogramGraphic = (objsToRender) => {
    const { sumType } = this.state;
    const data = objsToRender.map((obj) => ({ x: obj.name, y: this.calculateCount(obj) }));

    return (
      <FlexibleWidthXYPlot
        className={styles.graph}
        height={400}
        xType="ordinal"
        margin={{ bottom: 100 }}
      >
        <XAxis tickLabelAngle={-45} />
        <YAxis title={sumType === 'Promedio' ? 'Promedio' : 'Suma total'} />
        <VerticalBarSeries data={data} animation barWidth={0.1} />
        <LabelSeries data={data.map((d) => ({ ...d, label: `${d.y}`, xOffset: 15 }))} />
      </FlexibleWidthXYPlot>
    );
  }

  renderCakeDiagram = (objsToRender) => {
    const data = objsToRender.map((obj) => ({
      label: `${obj.name}: ${this.calculateCount(obj)}`,
      angle: this.calculateCount(obj)
    }));

    return (
      <RadialChart
        className={styles.radialGraph}
        height={350}
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

  renderGuidesSelector = () => {
    const { statistics } = this.props;
    const { guideId } = this.state;
    const currentGuide = guideId || statistics[0].guideId;

    return this.renderSelector({
      title: 'Guía:',
      value: currentGuide,
      onChange: this.onChangeGuide,
      values: [
        ...statistics.map((g) => <MenuItem key={g.guideId} value={g.guideId}>{g.guideId}</MenuItem>),
        <MenuItem key="Todos" value="Todos">Todos</MenuItem>
      ]
    });
  }

  renderGraphicTypeSelector = () => {
    const { graphicType } = this.state;

    return this.renderSelector({
      title: 'Tipo de gráfico:',
      value: graphicType,
      onChange: this.onChangeGraphicType,
      values: this.graphicTypes.map((gt) => (
        <MenuItem key={gt} value={gt}>{gt}</MenuItem>
      ))
    });
  }

  renderCountTypeSelector = () => {
    const { sumType } = this.state;

    return this.renderSelector({
      title: 'Tipo de cuenta:',
      value: sumType,
      onChange: this.onChangeSumType,
      values: this.sumTypes.map((gt) => (<MenuItem key={gt} value={gt}>{gt}</MenuItem>))
    });
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

  /**
   * Statistics should have this format:
   *
   * [{
   *  guideId: "derivadas",
   *  exercises: [{
   *    count: 3,
   *    exerciseId: "e4dbb07e-abe3-4138-82d2-dc11b9e7de14",
   *    name: "asdad",
   *    users: ["Milito", "Licha"]
   *  }]
   * }]
   *
   */
  render() {
    const { statistics } = this.props;

    if (!statistics.length) {
      return (
        <EmptyStatePage
          title="No existen estadísticas aún."
          subtitle="Tus alumnos deberán utilizar más el curso para que aparezcan"
        />
      );
    }

    return this.renderGraphic();
  }
}
