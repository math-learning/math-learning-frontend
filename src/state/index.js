import { combineReducers } from 'redux';

import {
  reducers as derivativeReducers
} from './derivative'

import {
  reducers as addExerciseReducers 
} from './addExercise'

const reducers = combineReducers({
  derivative: derivativeReducers,
  addExercise: addExerciseReducers
});

export default reducers;