export default (trashList = [], action) => {
  switch (action.type) {
    case 'FETCH_NEW_TRASH':
      trashList.push(action.trash);

      return trashList;
    default:
      return trashList;
  }
};
