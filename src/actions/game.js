export const addPoints = (points) => ({
  type: "ADD_POINTS",
  points
});

export const startGame = () => ({
  type: 'START_GAME'
});

export const endGame = () => ({
  type: 'END_GAME'
});

export const restart = () => ({
  type: 'RESTART'
});
