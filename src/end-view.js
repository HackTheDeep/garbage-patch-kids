import React from 'react'
import { startGame } from './actions/game.js'

const EndView = ({ state, dispatch }) => {
  return (
    <div className='panel'>
      Game over!
      <div className='fake-button' onClick={() => dispatch(startGame())}>
        Play again?
      </div>
    </div>
  )
}

export default EndView
