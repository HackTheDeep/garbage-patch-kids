const initialTrash = [[
    { x: 100, y: 10 },
    { x: 100, y: 20 },
    { x: 100, y: 30 },
    { x: 100, y: 40 },
    { x: 100, y: 50 },
    { x: 100, y: 60 },
    { x: 100, y: 70 },
    { x: 100, y: 60 },
    { x: 100, y: 50 },
    { x: 100, y: 40 },
    { x: 100, y: 30 },
    { x: 100, y: 20 },
  ],
  [
    { x: 10, y: 10 },
    { x: 20, y: 15 },
    { x: 30, y: 20 },
    { x: 40, y: 25 },
    { x: 50, y: 30 },
    { x: 60, y: 25 },
    { x: 70, y: 20 },
    { x: 60, y: 15 },
    { x: 50, y: 10 },
    { x: 40, y: 9 },
    { x: 30, y: 5 },
    { x: 20, y: 1 },
  ]
];

export default (trash = initialTrash, action) => {
  switch (action.type) {
    case 'FETCH_NEW_TRASH':
      return [...trash, action.trash];
    case 'REMOVE_TRASH':
      return trash.slice(0, action.id).concat(trash.slice(action.id, -1));
    default:
      return trash;
  }
};
