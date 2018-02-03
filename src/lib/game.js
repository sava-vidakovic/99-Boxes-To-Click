import _ from 'lodash';

export const generateCell = (x,y) => {
  return {
    key: `cell_${x}_${y}`,
    position: { x, y },
    filled: false,
    completed: false
  }
};

export const generateGrid = (size = 10) => {
  let grid = [];
  for (let x = 0; x < size; x++) {
    let row = grid[x] = [];
    for (let y = 0; y < size; y++) {
      row.push(generateCell(x,y));
    }
  }
  return grid;
}

export const generateLevel = (grid, selectedCell, level) => {
  if(level === 0 || level > 99) return grid;
  const randomAvailable = randomAvailableCell(grid);
  if(!randomAvailable) return grid;

  const gameGrid = _.cloneDeep(grid);
  const cellsInRange = inRange(grid, selectedCell);
  const possibleInRange = cellsInRange.filter(cell => cell.filled === false);
  
  if(possibleInRange.length) {
    let { x, y } = _.sample(possibleInRange).position;
    let next = gameGrid[x][y];
    next.filled = true;
    return generateLevel(gameGrid, next, level-1);
  } else {
    let { x, y } = randomAvailable.position;
    let next = gameGrid[x][y];
    next.filled = true;
    return generateLevel(gameGrid, next, level-1);
  }
}

export const randomAvailableCell = grid => {
  const cells = availableCells(grid);
  if(cells.length) {
    return _.sample(cells);
  }
}

export const availableCells = grid => {
  let available = [];
  eachCell(grid, cell => {
    if(cell.filled === false) {
      available.push(cell)
    }
  })
  return available;
}

export const incompletedCells = grid => {
  let incompleted = [];
  eachCell(grid, cell => {
    if(cell.filled && !cell.completed) {
      incompleted.push(cell)
    }
  })
  return incompleted;
}

export const eachCell = (grid, callback) => {
  for(let x = 0; x < grid.length; x++) {
    for(let y = 0; y < grid.length; y++) {
      callback(grid[x][y]);
    }
  }
}

export const inRange = (grid, selectedCell) => {
  let inRange = [];
  const { x, y } = selectedCell.position;

  eachCell(grid, cell => {

    if((cell.position.x === x || cell.position.y === y) && distance(selectedCell, cell) === 2 ) {
      inRange.push(cell);
    }

    if((cell.position.x !== x && cell.position.y !== y) && distance(selectedCell, cell) === 1 ) {
      inRange.push(cell);
    }
  })
  return inRange;
}

export const distance = (from, to) => {
  const x1 = from.position.x;
  const y1 = from.position.y;
  const x2 = to.position.x;
  const y2 = to.position.y;
  if(x1 === x2) {
    return Math.abs(y1-y2) - 1;
  }
  else if(y1 === y2) {
    return Math.abs(x1-x2) - 1;
  } else{
    return Math.hypot(x2-x1, y2-y1) / Math.sqrt(2) - 1;
  }
}
