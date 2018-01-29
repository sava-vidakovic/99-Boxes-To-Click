import _ from 'lodash';
import { 
  LEVEL_STARTED, 
  GRID_CHANGED,
  SET_ACTIVE
} from '../constants/ActionTypes';
import { generateLevel } from '../lib/game';

const gridChanged = grid => {
  return {
    type: GRID_CHANGED,
    payload: grid
  }
}

const setActive = cell => {
  return {
    type: SET_ACTIVE,
    payload: cell
  }
}

export const startGame = cell => (dispatch, getState) => {
  const { grid, level } = getState().game;
  const { x, y } = cell.position;
  let gameGrid = _.cloneDeep(grid);
  gameGrid[x][y].filled = true;
  gameGrid[x][y].completed = true;
  gameGrid = generateLevel(gameGrid, cell, level);
  dispatch({ type: LEVEL_STARTED });
  dispatch(gridChanged(gameGrid));
  dispatch(setActive(cell));
}

export const closeCell = cell => (dispatch, getState) => {
  const { game } = getState();
  const { grid } = game;
  let gameGrid = _.cloneDeep(grid);
  const { x, y } = cell.position;
  gameGrid[x][y].filled = true;
  gameGrid[x][y].completed = true;
  dispatch(setActive(cell));
  dispatch(gridChanged(gameGrid));
}
