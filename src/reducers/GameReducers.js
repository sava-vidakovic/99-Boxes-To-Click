import {
  GRID_CHANGED,
  LEVEL_STARTED,
  LEVEL_COMPLETED,
  LEVEL_FAILED,
  GAME_OVER,
  ADD_LIFE,
  SET_ACTIVE,
} from '../constants/ActionTypes';

import { generateGrid } from '../lib/game';


const INITIAL_STATE = {
  grid: generateGrid(),
  started: false,
  lives: 1,
  level: 1,
  currentActive: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GRID_CHANGED:
      return { ...state, grid: action.payload };
    case LEVEL_STARTED:
      return { ...state, started: true };
    case LEVEL_COMPLETED:
      return { ...state, started: false, level: state.level + 1, grid: generateGrid(), currentActive: null };
    case LEVEL_FAILED:
      return { ...state, started: false, grid: generateGrid(), currentActive: null, lives: action.payload};
    case GAME_OVER:
      return { ...state, ...INITIAL_STATE };
    case ADD_LIFE:
      return { ...state, lives: action.payload + state.lives };
    case SET_ACTIVE:
      return { ...state, currentActive: action.payload };
    default:
      return state;
  }
}
