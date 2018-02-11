import { combineReducers } from 'redux';
import score from './score.js';
import start from './start.js';

const rootReducer = combineReducers({ score, start });
export default rootReducer;
