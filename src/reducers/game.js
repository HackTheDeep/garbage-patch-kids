
const initialState = {
  screen: 'start',
  score: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POINT':
      return { ...state, score: state.score + 1 }
    case 'START_GAME':
      return { ...state, screen: 'play' }
    case 'END_GAME':
      return { ...state, screen: 'end' }
    default:
      return state;
  }
};
