export const addPoints = (points) => ({
  type: "ADD_POINTS",
  points
});

export const addMissedPoints = (points, endsInPatch) => ({
  type: 'ADD_MISSED_POINTS',
  points: points,
  endsInPatch: endsInPatch,
});

export const startGame = () => ({
  type: 'START_GAME'
});

export const endGame = () => ({
  type: 'END_GAME'
});
