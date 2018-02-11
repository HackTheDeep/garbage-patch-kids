import React from 'react'
import { endGame } from './actions/game.js'
import { fetchCityTrash, fetchNewTrash } from "./actions/trash.js";
import Game from './components/game.js'

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 430;

const CITIES = [
  'Rio',
  'Tokyo',
  'Sydney',
  'Test',
  'NYC',
  'Lisbon',
  'Seattle'
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
    </div>
  )
}

export default PlayView
