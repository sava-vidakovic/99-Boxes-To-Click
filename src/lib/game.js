
export const generateCell = (x,y) => {
  return {
    key: `cell_${x}_${y}`,
    position: { x, y },
    filled: false,
    completed: false
  }
};

export const generageGrid = (size = 10) => {
  let grid = [];
  for (let x = 0; x < size; x++) {
    let row = grid[x] = [];
    for (let y = 0; y < size; y++) {
      row.push(generateCell(x,y));
    }
  }
  return grid;
}
