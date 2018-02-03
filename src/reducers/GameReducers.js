import {
  GRID_CHANGED,
  LEVEL_STARTED,
  LEVEL_COMPLETED,
  LEVEL_FAILED,
  GAME_OVER,
  ADD_LIFE,
  SET_ACTIVE,
  UPDATE_MAX_LEVEL,
  SET_LEVEL,
} from '../constants/ActionTypes';

import { generateGrid } from '../lib/game';
import LocalStorage from '../lib/localStorage';

const startLevel = parseInt(process.env.REACT_APP_START_LEVEL, 10) || 1;

if(startLevel > LocalStorage.getMaxLevel()) {
  LocalStorage.saveMaxLevel(startLevel);
}

const INITIAL_STATE = () => {
  return {
    grid: generateGrid(),
    started: false,
    lives: 1,
    level: startLevel,
    maxLevel: LocalStorage.getMaxLevel(),
    currentActive: null,
  }
};

export default (state = INITIAL_STATE(), action) => {
  switch (action.type) {
    case GRID_CHANGED:
      return { ...state, grid: action.payload };
    case LEVEL_STARTED:
      return { ...state, started: true };
    case LEVEL_COMPLETED:
      return { ...state, started: false, level: state.level + 1, grid: generateGrid(), currentActive: null };
    case LEVEL_FAILED:
      return { ...state, started: false, grid: generateGrid(), currentActive: null, lives: action.payload};
    case UPDATE_MAX_LEVEL:
      return { ...state, maxLevel: action.payload}
    case SET_LEVEL:
      return { ...state, level: action.payload }  
    case GAME_OVER:
      return { ...state, ...INITIAL_STATE() };
    case ADD_LIFE:
      return { ...state, lives: action.payload + state.lives };
    case SET_ACTIVE:
      return { ...state, currentActive: action.payload };
    default:
      return state;
  }
}
