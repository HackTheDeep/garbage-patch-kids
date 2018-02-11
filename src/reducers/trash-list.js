export default (trashList = [], action) => {
  switch (action.type) {
    case 'FETCH_NEW_TRASH':
      trashList.push({
        lat: action.lat,
        lon: action.lon,
        x: action.x,
        y: action.y
      });

      return trashList;
    default:
      return trashList;
  }
};
