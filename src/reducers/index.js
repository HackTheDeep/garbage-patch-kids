import { combineReducers } from 'redux';
import score from './score.js';
import start from './start.js';
import trash from './trash-list.js';
import time from './time.js';

const rootReducer = combineReducers({ score, start, trash, time });

export default rootReducer;
