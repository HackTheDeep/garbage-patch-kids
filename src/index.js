import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { fetchCityTrash } from "./actions/trash.js";
import './index.css';
import App from './App';
import rootReducer from  './reducers';
import { tick } from './actions/time.js';
import { endGame } from './actions/game.js'

import { CANVAS_WIDTH, CANVAS_HEIGHT, CITIES } from './consts.js';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const container = document.getElementById('root');
const render = () => {
  ReactDOM.render(<App
    state={store.getState()}
    dispatch={store.dispatch}
    width={CANVAS_WIDTH}
    height={CANVAS_HEIGHT}
  />, container);
};

render();
store.subscribe(render);

const dispatchRandomTrash = () => {
  const state = store.getState();
  if (state.game.screen === 'play') {
    const randcity = CITIES[Math.floor(Math.random() * CITIES.length)];
    store.dispatch(fetchCityTrash(randcity,state.time, CANVAS_WIDTH, CANVAS_HEIGHT))
  }
  const randomTime = 100 + (5000/(state.game.score + 1));
  setTimeout(dispatchRandomTrash, randomTime);
}
dispatchRandomTrash();

const startTime = (new Date()).getTime();
const dispatchTick = () => {
  const now = (new Date()).getTime();
  const newTick = Math.floor((now - startTime) / 1000 * 60 / 2);
  const state = store.getState();

  if (state.time !== newTick) {
    store.dispatch(tick(newTick));

    if (state.game.screen === 'play' && state.trash.missedCount >= 50) {
      store.dispatch(endGame());
    }
  }

  requestAnimationFrame(dispatchTick);
};
requestAnimationFrame(dispatchTick);
