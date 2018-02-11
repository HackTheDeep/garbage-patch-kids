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
      <div onClick={() => dispatch(fetchNewTrash())}>
        click me for a new trash element
      </div>
      <Game time={state.time} dispatch={dispatch} trash={state.trash}/>
      {StartView({ state, dispatch })}
    </div>
  );
};

export default App;
