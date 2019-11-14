import { combineReducers } from 'redux';

import {
  reducers as derivativeReducers,
} from './derivative';

import {
  reducers as addExerciseReducers,
} from './addExercise';

import {
  reducers as coursesReducers,
} from './courses';

import {
  reducers as commonReducers,
} from './common';

import {
  reducers as modalReducers,
} from './modals';

const reducers = combineReducers({
  common: commonReducers,
  modals: modalReducers,
  courses: coursesReducers,
  derivative: derivativeReducers,
  addExercise: addExerciseReducers,
});

export default reducers;
