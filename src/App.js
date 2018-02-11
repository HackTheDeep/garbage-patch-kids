import React from 'react';
import { addPoints } from './actions/score.js'
import StartView from './start-view.js'

const App = ({ state, dispatch }) => {
  return (
    <div>
      <div onClick={() => dispatch(addPoints(1))}>
        Hi! Your score is {state.score}.
      </div>
      {StartView({ state, dispatch })}
    </div>
  );
}

export default App;
