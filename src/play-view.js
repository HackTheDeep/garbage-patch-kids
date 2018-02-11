import React from 'react'
import { endGame } from './actions/game.js'
import { fetchNewTrash } from "./actions/fetch-new-trash.js";
import Game from './components/game.js'

const PlayView = ({ state, dispatch }) => {
  return (
    <div className='panel'>
      <div onClick={() => dispatch(fetchNewTrash(600, 300))}>
        click me for a new trash element
      </div>
      <Game time={state.time} dispatch={dispatch} trash={state.trash} mapWidth={600} mapHeight={300}/>
      <button onClick={() => dispatch(endGame())}>End game</button>
    </div>
  )
}

export default PlayView
