import { combineReducers } from 'redux';

import {
  reducers as derivativeReducers
} from './derivative'

const reducers = combineReducers({
  derivative: derivativeReducers
});

export default reducers;
