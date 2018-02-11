import React from 'react';
import duck from '../duck.png';
import { removeTrash } from '../actions/trash.js';
import { addPoints } from '../actions/game.js';

const img = new Image();
img.src = duck;

const width = 30;
const height = 30;

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

    trash.trashList.forEach((trashElement) => {
      let startTime = trashElement.startTime;
      let path = trashElement.trash;
      let length = path.length;
      let index = time - startTime;

      if (trashElement.endsInPatch && index >= length) {
        ctx.drawImage(img, path[length - 1].x, path[length - 1].y, 10, 10);
      } else {
        ctx.drawImage(img, path[index].x, path[index].y, width, height);
      }
    });
  }

  handleClick = e => {
    const canvas = this.canvas;
    const { time, trash, dispatch } = this.props;

    const offsetX = canvas.offsetLeft;
    const offsetY = canvas.offsetTop;

    const mouseX = e.clientX - offsetX;
    const mouseY = e.clientY - offsetY;

    trash.trashList.forEach((trashElement, id) => {
      let startTime = trashElement.startTime;
      let path = trashElement.trash;
      let index = time - startTime;

      if (path[index]) {
        const { x, y } = path[index];
        if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
          console.log('click');
          dispatch(removeTrash(id));
          dispatch(addPoints(1));
        }
      }
    });
  }

  render() {
    const { mapWidth, mapHeight } = this.props;
    return <canvas width={mapWidth} height={mapHeight} ref={canvas => this.canvas = canvas} />
  }
}

export default Game;
