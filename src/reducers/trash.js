export default (trash = [], action) => {
  switch (action.type) {
    case 'FETCH_NEW_TRASH':
      return [...trash, {
        startTime: action.startTime,
        trash: action.trash,
        endsInPatch: action.endsInPatch,
      }];
    case 'REMOVE_TRASH':
      const newTrash = [...trash];
      newTrash.splice(action.id, 1);
      return newTrash;
    default:
      return trash;
  }
};
