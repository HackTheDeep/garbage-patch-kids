import React from 'react';
import duck from '../duck.png';
import { removeTrash } from '../actions/trash.js';
import { addPoints } from '../actions/game.js';

const img = new Image();
img.src = duck;

const width = 20;
const height = 20;

class Game extends React.Component {
  componentDidMount() {
    const canvas = this.canvas;
    canvas.addEventListener('click', this.handleClick, false);
  }

  componentDidUpdate() {
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    const { time, trash } = this.props;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trash.forEach((path, id) => {
      const t = time % path.length;
      const { x, y } = path[t];
      ctx.drawImage(img, x, y, width, height);
    });
  }

  handleClick = e => {
    const canvas = this.canvas;
    const { time, trash, dispatch } = this.props;

    const offsetX = canvas.offsetLeft;
    const offsetY = canvas.offsetTop;

    const mouseX = e.clientX - offsetX;
    const mouseY = e.clientY - offsetY;

    trash.forEach((path, id) => {
      const t = time % path.length;
      const { x, y } = path[t];

      if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
        console.log('click');
        dispatch(removeTrash(id));
        dispatch(addPoints(1));
      }
    });
  }

  render() {
    const { mapWidth, mapHeight } = this.props;
    return <canvas width={mapWidth} height={mapHeight} ref={canvas => this.canvas = canvas} />
  }
}

export default Game;
