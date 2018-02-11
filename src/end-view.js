import React from 'react'
import { restart } from './actions/game.js'

const EndView = ({ state, dispatch }) => {
  return (
    <div className='panel'>
      Game over!
      <div className='fake-button' onClick={() => dispatch(restart())}>
        Play again?
      </div>
    </div>
  )
}

export default EndView
