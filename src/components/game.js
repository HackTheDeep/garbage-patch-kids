import React from 'react';
import duck from '../duck.png';

const img = new Image();
img.src = duck;

class Game extends React.Component {

  componentDidUpdate() {
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    const { time, trash } = this.props;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trash.forEach(path => {
      const t = time % path.length;
      ctx.drawImage(img, path[t].x, path[t].y, 20, 20);
    });
  }

  render() {
    return <canvas width={300} height={300} ref={canvas => this.canvas = canvas} />
  }
}

export default Game;
