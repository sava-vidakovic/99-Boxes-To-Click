import _ from 'lodash';

export const generateCell = (x, y) => (
  {
    key: `cell_${x}_${y}`,
    position: { x, y },
    filled: false,
    completed: false,
  }
);


export const generateGrid = (size = 10) => {
  const grid = [];
  for (let x = 0; x < size; x += 1) {
    grid[x] = [];
    for (let y = 0; y < size; y += 1) {
      grid[x].push(generateCell(x, y));
    }
  }
  return grid;
};

export const eachCell = (grid, callback) => {
  for (let x = 0; x < grid.length; x += 1) {
    for (let y = 0; y < grid.length; y += 1) {
      callback(grid[x][y]);
    }
  }
};

export const availableCells = (grid) => {
  const available = [];
  eachCell(grid, (cell) => {
    if (cell.filled === false) {
      available.push(cell);
    }
  });
  return available;
};

export const randomAvailableCell = (grid) => {
  const cells = availableCells(grid);
  if (cells.length) {
    return _.sample(cells);
  }
  return null;
};

export const distance = (from, to) => {
  const x1 = from.position.x;
  const y1 = from.position.y;
  const x2 = to.position.x;
  const y2 = to.position.y;
  if (x1 === x2) {
    return Math.abs(y1 - y2) - 1;
  } else if (y1 === y2) {
    return Math.abs(x1 - x2) - 1;
  }
  return (Math.hypot(x2 - x1, y2 - y1) / Math.sqrt(2)) - 1;
};

export const inRange = (grid, selectedCell) => {
  const result = [];
  const { x, y } = selectedCell.position;

  eachCell(grid, (cell) => {
    if ((cell.position.x === x || cell.position.y === y) && distance(selectedCell, cell) === 2) {
      result.push(cell);
    }

    if ((cell.position.x !== x && cell.position.y !== y) && distance(selectedCell, cell) === 1) {
      result.push(cell);
    }
  });
  return result;
};

export const generateLevel = (grid, selectedCell, level) => {
  if (level === 0 || level > 99) return grid;
  const randomAvailable = randomAvailableCell(grid);
  if (!randomAvailable) return grid;

  const gameGrid = _.cloneDeep(grid);
  const cellsInRange = inRange(grid, selectedCell);
  const possibleInRange = cellsInRange.filter(cell => cell.filled === false);

  if (possibleInRange.length) {
    const { x, y } = _.sample(possibleInRange).position;
    const next = gameGrid[x][y];
    next.filled = true;
    return generateLevel(gameGrid, next, level - 1);
  }
  const { x, y } = randomAvailable.position;
  const next = gameGrid[x][y];
  next.filled = true;
  return generateLevel(gameGrid, next, level - 1);
};

export const incompletedCells = (grid) => {
  const incompleted = [];
  eachCell(grid, (cell) => {
    if (cell.filled && !cell.completed) {
      incompleted.push(cell);
    }
  });
  return incompleted;
};
