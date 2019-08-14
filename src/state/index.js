import { combineReducers } from 'redux';

import {
  reducers as derivativeReducers
} from './derivative'

import {
  reducers as addExerciseReducers 
} from './addExercise'

import {
  reducers as snackbarReducers
} from './snackbar'

const reducers = combineReducers({
  derivative: derivativeReducers,
  addExercise: addExerciseReducers,
  snackbar: snackbarReducers
});

export default reducers;