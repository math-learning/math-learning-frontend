import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

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

import {
  reducers as guidesReducers,
} from './guides';

import {
  reducers as statisticsReducers,
} from './statistics';

const createRootReducer = (history) => combineReducers({
  common: commonReducers,
  courses: coursesReducers,
  exercises: exercisesReducers,
  modals: modalReducers,
  router: connectRouter(history),
  guides: guidesReducers,
  statistics: statisticsReducers
});

export default createRootReducer;
