import React from 'react';
import { addPoints } from './actions/score.js'
import {fetchNewTrash} from "./actions/fetch-new-trash.js";
import StartView from './start-view.js'
import Game from './components/game.js'

const App = ({ state, dispatch }) => {
  return (
    <div>
      <div onClick={() => dispatch(addPoints(1))}>
        Hi! Your score is {state.score}.
      </div>
      <div onClick={() => dispatch(fetchNewTrash(600, 300))}>
        click me for a new trash element
      </div>
      <Game time={state.time} dispatch={dispatch} trash={state.trash} mapWidth={600} mapHeight={300}/>
      {StartView({ state, dispatch })}
    </div>
  );
};

export default App;
