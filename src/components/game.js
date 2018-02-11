import React from 'react';
import duck from '../duck.png';

const trash = [[
    { x: 100, y: 10 },
    { x: 100, y: 20 },
    { x: 100, y: 30 },
    { x: 100, y: 40 },
    { x: 100, y: 50 },
    { x: 100, y: 60 },
    { x: 100, y: 70 },
    { x: 100, y: 60 },
    { x: 100, y: 50 },
    { x: 100, y: 40 },
    { x: 100, y: 30 },
    { x: 100, y: 20 },
  ],
  [
    { x: 10, y: 10 },
    { x: 20, y: 15 },
    { x: 30, y: 20 },
    { x: 40, y: 25 },
    { x: 50, y: 30 },
    { x: 60, y: 25 },
    { x: 70, y: 20 },
    { x: 60, y: 15 },
    { x: 50, y: 10 },
    { x: 40, y: 9 },
    { x: 30, y: 5 },
    { x: 20, y: 1 },
  ]
];

const img = new Image();
img.src = duck;

class Game extends React.Component {

  componentDidUpdate() {
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    const { time } = this.props;

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
