import React from 'react';
import StartView from './start-view.js'
import EndView from './end-view.js'
import PlayView from './play-view.js'

const App = ({ state, dispatch }) => {
  switch (state.game.screen) {
    case 'start':
      return <StartView state={state} dispatch={dispatch} />;
    case 'play':
      return <PlayView state={state} dispatch={dispatch} />;
    case 'end':
      return <EndView state={state} dispatch={dispatch} />;
    default:
      return <div>Opps, something's broken</div>;
  }
};

export default App;
