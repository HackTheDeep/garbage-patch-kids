export default (trash = [], action) => {
  switch (action.type) {
    case 'FETCH_NEW_TRASH':
      return [...trash, action.trash];
    case 'REMOVE_TRASH':
      const newTrash = [...trash];
      newTrash.splice(action.id, 1);
      return newTrash;
    default:
      return trash;
  }
};
