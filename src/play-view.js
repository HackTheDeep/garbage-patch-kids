import React from 'react'
import { fetchNewTrash } from "./actions/trash.js";
import Game from './components/game.js'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './consts.js';

const PlayView = ({ state, dispatch }) => {
  return (
    <div className='panel'>
      <Game time={state.time} dispatch={dispatch} trash={state.trash} mapWidth={CANVAS_WIDTH} mapHeight={CANVAS_HEIGHT}/>
      <div className='score-container'>
        <div className='score score-middle'>Trash collected: {state.game.score}</div>
        <div className='score score-middle'>Trash missed: {state.trash.missedCount}</div>
        <div className='score score-right'>Trash in Garbage Patch: {state.trash.patchCount}</div>
        <button onClick={() => dispatch(fetchNewTrash(state.time, CANVAS_WIDTH, CANVAS_HEIGHT))}>random</button>
      </div>
    </div>
  )
}

// NOTE - patchCount is being divided by 10 because for an unknown reason it's bigger by a factor of ten >:(

export default PlayView
