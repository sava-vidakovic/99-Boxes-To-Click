import { createSelector } from 'reselect'
import { inRange, incompletedCells } from '../lib/game';

const getGrid = state => state.game.grid;
const getActiveCell = state => state.game.currentActive;

export const getPossibleMoves = createSelector(
  [ getGrid, getActiveCell ], (grid, activeCell) => {
    if(!activeCell) return ;
    return inRange(grid, activeCell)
      .filter(cell => cell.filled && !cell.completed)
      .map(cell => cell.key);
  } 
)

export const incompleteCells = createSelector(
  [ getGrid ], (grid) => incompletedCells(grid).length
)
