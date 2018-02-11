import React from 'react';
import { addPoints } from './actions/score.js'
import {fetchNewTrash} from "./actions/fetch-new-trash.js";
import StartView from './start-view.js'

const App = ({ state, dispatch }) => {
  return (
    <div>
      <div onClick={() => dispatch(addPoints(1))}>
        Hi! Your score is {state.score}.
      </div>
      {StartView({ state, dispatch })}
      <div onClick={() => dispatch(fetchNewTrash())}>
        click me for a new trash element
        <ul>
          {state.trash.map(function(trashElement){
            return <li>
              (Lat {trashElement.lat}, Lon {trashElement.lon}) - (X {trashElement.x}, Y {trashElement.y})
            </li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default App;
