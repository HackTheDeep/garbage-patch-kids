import React from 'react'
import { startGame } from '../actions/game.js'

const StartView = ({ state, dispatch }) => {
  return (
    <div className='panel'>
      <span className='trash-container'></span>
      <span className='trash-container-1'></span>
      <span className='trash-container-2'></span>
      <span className='trash-container-3'></span>
      <span className='trash-container-4'></span>
      <span className='trash-container-5'></span>
      <span className='trash-container-6'></span>
      <span className='trash-container-7'></span>
      <div className='ugly-border inner'>
        <div className='text-container'>
          <div className='heading'>
            welcome to garbage town
          </div>
          <div className='textbox'>
            the world is full of garbage! o no!
          </div>
          <div className='heading'>
            how to play
          </div>
          <div className='textbox'>
            click on the garbage before it gets stuck in the Great Pacific Garbage Patch
          </div>
        </div>
        <div className='fake-button' onClick={() => dispatch(startGame())}>
          Start
        </div>
      </div>
    </div>
  )
}

export default StartView
