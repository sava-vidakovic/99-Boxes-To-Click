import _ from 'lodash';
import { 
  GRID_CHANGED,
  SET_ACTIVE,
  LEVEL_STARTED, 
  LEVEL_COMPLETED,
  LEVEL_FAILED,
  SET_LEVEL,
  GAME_OVER,
  ADD_LIFE,
  UPDATE_MAX_LEVEL,
} from '../constants/ActionTypes';
import { generateLevel } from '../lib/game';
import LocalStorage from '../lib/localStorage';
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

export const setLevel = level => {
  return {
    type: SET_LEVEL,
    payload: level,
  }
}

const setMaxLevel = currentLevel => (dispatch, getState) => {
  const maxLevel = getState().game.maxLevel;
  const level = currentLevel > maxLevel ? currentLevel : maxLevel;
  LocalStorage.saveMaxLevel(level);
  dispatch({
    type: UPDATE_MAX_LEVEL,
    payload: level,
  })
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

export const completeLevel = () => (dispatch, getState) => {
  dispatch({ type: LEVEL_COMPLETED });
  dispatch({ type: ADD_LIFE, payload: 1 });
  dispatch(stopTimer());
  const { game } = getState();
  dispatch(setMaxLevel(game.level));
}

export const levelLost = () => (dispatch, getState) => {
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
