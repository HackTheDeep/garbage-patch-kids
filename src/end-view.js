import React from 'react'
import { restart } from './actions/game.js'

const EndView = ({ state, dispatch }) => {
  return (
    <div className='over-container'>
      <span className='bag-container-4'></span>
      <span className='bag-container'></span>
      <span className='bag-container-1'></span>
      <span className='bag-container-5'></span>
      <span className='bag-container-2'></span>
      <span className='bag-container-3'></span>
      <div className='over'>Game over!</div>
      <div className='fake-button' onClick={() => dispatch(restart())}>
        Play again?
      </div>
    </div>
  )
}

export default EndView
