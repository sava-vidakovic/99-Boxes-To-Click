import _ from 'lodash';
import { 
  LEVEL_STARTED, 
  GRID_CHANGED 
} from '../constants/ActionTypes';
import { generateLevel } from '../lib/game';

const gridChanged = grid => {
  return {
    type: GRID_CHANGED,
    payload: grid
  }
}

export const startGame = cell => (dispatch, getState) => {
  const { grid } = getState().game;
  const { x, y } = cell.position;
  let gameGrid = _.cloneDeep(grid);
  gameGrid[x][y].filled = true;
  gameGrid[x][y].completed = true;
  gameGrid = generateLevel(gameGrid, cell, 15);
  dispatch({ type: LEVEL_STARTED });
  dispatch(gridChanged(gameGrid));
}
