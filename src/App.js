import React from 'react';
<<<<<<< HEAD
import StartView from './start-view.js'
import EndView from './end-view.js'
import PlayView from './play-view.js'
=======
import { addPoints } from './actions/score.js'
import {fetchNewTrash} from "./actions/fetch-new-trash.js";
import StartView from './components/start-view.js'
import Game from './components/game.js'
>>>>>>> silly animation

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
