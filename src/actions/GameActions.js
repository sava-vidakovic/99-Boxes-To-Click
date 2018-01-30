import _ from 'lodash';
import { 
  GRID_CHANGED,
  SET_ACTIVE,
  LEVEL_STARTED, 
  LEVEL_COMPLETED,
  LEVEL_FAILED,
  GAME_OVER,
  ADD_LIFE,
} from '../constants/ActionTypes';
import { generateLevel } from '../lib/game';
import { stopTimer } from './TimerActions';
import { getIncompleteCells } from '../selectors';

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

export const completeLevel = () => dispatch => {
  dispatch({ type: LEVEL_COMPLETED });
  dispatch({ type: ADD_LIFE, payload: 1 });
  dispatch(stopTimer());
}

export const levelFailed = () => (dispatch, getState) => {
  const state = getState();
  const { lives, } = state.game;
  const incompletedCells = getIncompleteCells(state);
  const newLives = lives - incompletedCells;
  dispatch(stopTimer());
  if(newLives <= 0) {
    dispatch({ type: GAME_OVER });
  } else{
    dispatch({ type: LEVEL_FAILED, payload: newLives });
  }

}
