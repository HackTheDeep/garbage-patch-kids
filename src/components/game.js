import React from 'react';
import duck from '../duck.png';
import { removeTrash } from '../actions/trash.js';
import { addPoints } from '../actions/game.js';

const img = new Image();
img.src = duck;

const width = 20;
const height = 20;

class Game extends React.Component {

  componentDidUpdate() {
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    const { time, trash, dispatch } = this.props;

    const offsetX = canvas.offsetLeft;
    const offsetY = canvas.offsetTop;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trash.forEach((path, id) => {
      const t = time % path.length;
      const { x, y } = path[t];
      ctx.drawImage(img, x, y, width, height);

      canvas.addEventListener('click', e => {
        const mouseX = e.clientX - offsetX;
        const mouseY = e.clientY - offsetY;

        if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
          console.log('click');
          dispatch(removeTrash(id));
        }
      }, false);
    });
  }

  render() {
    const { mapWidth, mapHeight } = this.props;
    return <canvas width={mapWidth} height={mapHeight} ref={canvas => this.canvas = canvas} />
  }
}

export default Game;
