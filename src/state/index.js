import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import {
  reducers as derivativeReducers,
} from './derivative';

import {
  reducers as addExerciseReducers,
} from './addExercise';

import {
  reducers as exercisesReducers,
} from './exercises';

import {
  reducers as coursesReducers,
} from './courses';

import {
  reducers as commonReducers,
} from './common';

import {
  reducers as modalReducers,
} from './modals';

const createRootReducer = (history) => combineReducers({
  addExercise: addExerciseReducers,
  common: commonReducers,
  courses: coursesReducers,
  derivative: derivativeReducers,
  exercises: exercisesReducers,
  modals: modalReducers,
  router: connectRouter(history),
});

export default createRootReducer;
