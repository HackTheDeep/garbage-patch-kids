import React from 'react'
import { endGame } from './actions/game.js'
import { fetchNewTrash } from "./actions/fetch-new-trash.js";
import Game from './components/game.js'

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 430;

const PlayView = ({ state, dispatch }) => {
  return (
    <div className='panel'>
      <div onClick={() => dispatch(fetchNewTrash(CANVAS_WIDTH, CANVAS_HEIGHT))}>
        click me for a new trash element
      </div>
      <Game time={state.time} dispatch={dispatch} trash={state.trash} mapWidth={CANVAS_WIDTH} mapHeight={CANVAS_HEIGHT}/>
      <button onClick={() => dispatch(endGame())}>End game</button>
    </div>
  )
}

export default PlayView