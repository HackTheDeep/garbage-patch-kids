
export default(state = 0, action) => {
  switch (action.type) {
    case 'TICK':
      return action.tick;
    default:
      return state;
  }
};
