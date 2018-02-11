import { combineReducers } from 'redux';
import trash from './trash.js';
import time from './time.js';
import game from './game.js';

const rootReducer = combineReducers({ game, trash, time });

export default rootReducer;
