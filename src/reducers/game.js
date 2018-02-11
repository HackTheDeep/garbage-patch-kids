const initialState = {
  screen: 'start',
  score: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POINTS':
      return { ...state, score: state.score + action.points }
    case 'START_GAME':
      return { ...state, screen: 'play' }
    case 'END_GAME':
      return { ...state, screen: 'end' }
    default:
      return state;
  }
};
