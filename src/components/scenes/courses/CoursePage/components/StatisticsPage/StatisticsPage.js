// import {
//   Container, Grid, Typography, TextField, CircularProgress, InputAdornment
// } from '@material-ui/core';
import React, { Component } from 'react';
import '../../../../../../../node_modules/react-vis/dist/style.css';
import { VictoryChart, VictoryScatter, VictoryLine, VictoryStack, VictoryArea } from 'victory';

import {XYPlot, FlexibleWidthXYPlot,XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, AreaSeries} from 'react-vis';

import {
  TextField, Typography, FormControl, InputLabel, Button, Select, MenuItem
} from '@material-ui/core';

import BootstrapDropdownInput from '../../../../../../bootstrap/dropdownInput';

import styles from './StatisticsPage.module.sass';

var numberArray = [50, 60, 70, 80]; 


const months = ['abril', 'mayo', 'junio', 'julio', 'agosto'];

const usersStatistics = {};

months.forEach((month) => {
  usersStatistics[month] = [{ x: 0, y: 0 }];

  for (let i = 1; i < 29; i += 1) {
    usersStatistics[month].push({ x: i, y: numberArray[Math.floor(Math.random() * numberArray.length)] });
  }
});

console.log(usersStatistics);


// const data = [
//   { x: 0, y: 8 },
//   { x: 1, y: 5 },
//   { x: 2, y: 4 }
// ];

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      month: 'abril',
      year: '2020'
    };
  }

  onChangeMonth = (event) => {
    const month = event.target.value;

    console.log('VALUE', month)
    this.setState({ month });
  }

  render() {
    const { month, year } = this.state;
    const data = usersStatistics[month];

    return (
      <div className={styles.container}>
        {/* XYPlot */}
        <FlexibleWidthXYPlot className={styles.graph} height={400} yType="ordinal" xType="ordinal">
          <XAxis title="Día" />
          <YAxis title="Cantidad de usuarios" />
          <AreaSeries data={data} curve="curveNatural" animation />
        </FlexibleWidthXYPlot>

        <div className={styles.selectors}>
          <Select
            id="year-selector"
            value={year}
            className={styles.leftSelector}
            onChange={this.onChangeYear}
            input={<BootstrapDropdownInput />}
          >
            <MenuItem value="2020">2020</MenuItem>
            <MenuItem value="2019">2019</MenuItem>
          </Select>
          <Select
            id="month-selector"
            value={month}
            onChange={this.onChangeMonth}
            input={<BootstrapDropdownInput />}
          >
            <MenuItem value="septiembre">Septiembre</MenuItem>
            <MenuItem value="agosto">Agosto</MenuItem>
            <MenuItem value="julio">Julio</MenuItem>
            <MenuItem value="junio">Junio</MenuItem>
            <MenuItem value="abril">Abril</MenuItem>
          </Select>
        </div>
      </div>
    )
  }
}


















// const data = [
  // { x: 0, y: 0 },
  // { x: 1, y: 2 },
  // { x: 2, y: 1 },
  // { x: 3, y: 4 },
  // { x: 4, y: 3 },
  // { x: 5, y: 5 }
// ];

// export default class StatisticsPage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       interpolation: 'linear',
//       polar: false
//     };
//   }

//   render() {
//     return (
//       <div className={styles.graphContainer}>
//         <VictoryChart height={400} weight={900}>
//           <VictoryLine
//             interpolation="cardinal" data={data}
//             style={{ data: { stroke: "#c43a31" } }}
//           />
//           <VictoryScatter data={data}
//             size={5}
//             style={{ data: { fill: "#c43a31" } }}
//           />
//         </VictoryChart>
//       </div>
//     );
//   }
// }
