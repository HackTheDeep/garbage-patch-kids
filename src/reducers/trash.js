const initialState = {
  missedCount: 0,
  patchCount: 0,
  trashList: [],
};

export default (trash = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRASH':
      return {
        ...trash,
        trashList: [...trash.trashList, {
          startTime: action.startTime,
          trash: action.trash,
          endsInPatch: action.endsInPatch,
        }]
      };
    case 'REMOVE_TRASH':
      const newTrash = [...trash.trashList];
      newTrash.splice(action.id, 1);

      return {
        ...trash,
        trashList: trash.trashList
      };
    case 'TICK':
      let patchCount = 0;
      let missedCount = 0;

      trash.trashList.forEach((trashElement) => {
        let path = trashElement.trash;
        let length = path.length;
        let index = action.tick - trashElement.startTime;

        if (index === length) {
          if (trashElement.endsInPatch) {
            patchCount++;
          } else {
            missedCount++;
          }
        }
      });

      return {
        ...trash,
        missedCount: trash.missedCount + missedCount,
        patchCount: trash.patchCount + patchCount
      };
    default:
      return trash;
  }
};
