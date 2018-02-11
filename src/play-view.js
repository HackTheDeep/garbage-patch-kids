import React from 'react'
import { endGame } from './actions/game.js'
import { fetchCityTrash, fetchNewTrash } from "./actions/trash.js";
import Game from './components/game.js'

// 6460 x 3480
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 500;

const CITIES = [
  'Rio',
  'Tokyo',
  'Sydney',
  'Test',
  'NYC',
  'Lisbon',
  'Seattle',
];

const PlayView = ({ state, dispatch }) => {
  return (
    <div className='panel'>
      <Game time={state.time} dispatch={dispatch} trash={state.trash} mapWidth={CANVAS_WIDTH} mapHeight={CANVAS_HEIGHT}/>
      <div>
        <button onClick={() => dispatch(fetchNewTrash(state.time, CANVAS_WIDTH, CANVAS_HEIGHT))}>random</button>
        {
          CITIES.map((city, index) => (
            <button key={index}
                    onClick={() => dispatch(fetchCityTrash(city, state.time, CANVAS_WIDTH, CANVAS_HEIGHT))}>
              {city}
            </button>
          ))
        }
      </div>
      <div>
        <button onClick={() => dispatch(endGame())}>End game</button>
      </div>
      <div>
        Trash collected: {state.game.score}
        <br/>
        Trash missed: {state.game.missedCount}
        <br/>
        Trash in Garbage Patch: {state.game.patchCount}
      </div>
    </div>
  )
}

export default PlayView
