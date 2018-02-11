const initialState = {
  missedCount: 0,
  patchCount: 0,
  trashList: [],
};

function removeTrashAtIndex(trashList, index) {
  const newTrashList = [...trashList];
  newTrashList.splice(index, 1);
  return newTrashList;
}

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
      return {
        ...trash,
        trashList: removeTrashAtIndex(trash.trashList, action.id),
      };
    case 'TICK':
      let patchCount = 0;
      let missedCount = 0;

      let missedIndices = [];

      trash.trashList.forEach((trashElement, elementIndex) => {
        let path = trashElement.trash;
        let length = path.length;
        let timeIndex = action.tick - trashElement.startTime;

        if (timeIndex === length) {
          if (trashElement.endsInPatch) {
            patchCount++;
          } else {
            missedCount++;
            missedIndices = [...missedIndices, elementIndex];
          }
        }
      });

      let newTrashList = [...trash.trashList];

      missedIndices.reverse().forEach(indexToRemove => {
        newTrashList = removeTrashAtIndex(newTrashList, indexToRemove);
      });

      return {
        ...trash,
        missedCount: trash.missedCount + missedCount,
        patchCount: trash.patchCount + patchCount,
        trashList: newTrashList,
      };
    default:
      return trash;
  }
};
