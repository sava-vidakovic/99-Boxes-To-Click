import {
  generateCell,
  generateGrid,
  generateLevel,
  incompletedCells,
  availableCells,
  distance,
  inRange
} from './game';

let grid;
let cell;

describe('Game lib', () => {

  beforeEach(() =>{
    grid = generateGrid();
    cell = generateCell(1,2);
  })

  it('should generate cell', () => {
    const expected = { 
      key: 'cell_1_2',
      position: { x:1, y:2 },
      filled: false,
      completed: false,
    };
    expect(expected).toEqual(cell);
  })

  it('should generate grid 10x10', () => {
    expect(grid.length).toEqual(10);
    expect(grid[9].length).toEqual(10);
  })

  it('should generate level', () => {
    const level = generateLevel(grid, cell, 15);
    expect(incompletedCells(level).length).toEqual(15);
  })

  it('should return all available cells', () => {
    grid[1][1].filled = true;
    const available = availableCells(grid);
    expect(available.length).toEqual(99);
  })

  it('should return incompleted cells', () =>{
    grid[1][1].filled = true;
    grid[1][1].completed = true;
    const available = availableCells(grid);
    expect(available.length).toEqual(99);
  })

  it('should return valid diagonal distance', () => {
    const cell1 = generateCell(0, 0);
    const cell2 = generateCell(9, 9);
    const totalDistance = distance(cell1, cell2);
    expect(totalDistance).toEqual(8)
  })

  it('should return valid horizontal distance', () => {
    const cell1 = generateCell(0, 0);
    const cell2 = generateCell(0, 9);
    const totalDistance = distance(cell1, cell2);
    expect(totalDistance).toEqual(8)
  })

  it('should return valid vertical distance', () => {
    const cell1 = generateCell(0, 0);
    const cell2 = generateCell(9, 0);
    const totalDistance = distance(cell1, cell2);
    expect(totalDistance).toEqual(8)
  })

  it('should return cells in range', () => {
    const selectedCell = generateCell(0, 0);
    const cellsInRange = inRange(grid, selectedCell);
    const expectedResult = [];
    expectedResult.push(generateCell(0, 3));
    expectedResult.push(generateCell(2, 2));
    expectedResult.push(generateCell(3, 0));
    expect(cellsInRange.length).toEqual(3);
    expectedResult.forEach((cell, index) => {
      expect(cellsInRange[index]).toEqual(cell);
    })

  })

})
