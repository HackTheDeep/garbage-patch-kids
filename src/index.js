import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import './index.css';
import App from './App';
import rootReducer from  './reducers';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const container = document.getElementById('root');
const render = () => {
  ReactDOM.render(<App
    state={store.getState()}
    dispatch={store.dispatch}
  />, container);
};

render();
store.subscribe(render);
