const initialState = {
  screen: 'start',
  score: 0,
  patchCount: 0,
  missedCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POINTS':
      return { ...state, score: state.score + action.points }
    case 'ADD_MISSED_POINTS':
      if (action.endsInPatch) {
        return {...state, patchCount: state.patchCount + action.points};
      } else {
        return {...state, missedCount: state.missedCount + action.points};
      }
    case 'START_GAME':
      return { ...state, screen: 'play' }
    case 'END_GAME':
      return { ...state, screen: 'end' }
    default:
      return state;
  }
};
