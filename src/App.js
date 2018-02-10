import React from 'react';
import { addPoints } from './actions/score.js'

const App = ({ state, dispatch }) => {
  return <div onClick={() => dispatch(addPoints(1))}>
    Hi! Your score is {state.score}.
  </div>;
}

export default App;
