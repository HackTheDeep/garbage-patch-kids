import React from 'react'
import { startGame } from './actions/game.js'

const StartView = ({ state, dispatch }) => {
  return (
    <div className='panel'>
      <div className='ugly-border inner'>
        <div className='text-container'>
          <div className='heading'>
            how to play
          </div>
          <div className='textbox'>
            this is where we tell you how to play! the world is full of garbage! o no!
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
