import { combineReducers } from 'redux';
import score from './score.js';
import start from './start.js';
import trash from './trash-list.js';

const rootReducer = combineReducers({ score, start, trash });
export default rootReducer;
