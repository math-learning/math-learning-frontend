import { combineReducers } from 'redux';

import {
  reducers as derivativeReducers,
} from './derivative';

import {
  reducers as addExerciseReducers,
} from './addExercise';

import {
  reducers as commonReducers,
} from './common';

const reducers = combineReducers({
  common: commonReducers,
  derivative: derivativeReducers,
  addExercise: addExerciseReducers,
});

export default reducers;
