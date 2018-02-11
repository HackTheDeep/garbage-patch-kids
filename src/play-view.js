import React from 'react'
import { endGame } from './actions/game.js'
import { fetchCityTrash, fetchNewTrash, MAX_LAT_METERS, MAX_LON_METERS } from "./actions/trash.js";
import Game from './components/game.js'

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = CANVAS_WIDTH * MAX_LAT_METERS / MAX_LON_METERS;

const CITIES = [
  'Rio',
  'Tokyo',
  'Sydney',
  'NYC',
  'Lisbon',
  'Seattle',
  'LA',
  'Santiago',
  'Cape Town',
  'Mumbai',
  'Hong Kong',
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
      <div className='score-container'>
      <div className='score score-left score-label'>Score:</div>
        <div className='score score-middle'>Trash collected: {state.game.score}</div>
        <div className='score score-middle'>Trash missed: {state.trash.missedCount}</div>
        <div className='score score-right'>Trash in Garbage Patch: {state.trash.patchCount / 10}</div>
      </div>
    </div>
  )
}

// NOTE - patchCount is being divided by 10 because for an unknown reason it's bigger by a factor of ten >:(

export default PlayView
