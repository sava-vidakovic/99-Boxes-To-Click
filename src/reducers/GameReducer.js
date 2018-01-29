import {
  GRID_CHANGED,
  LEVEL_STARTED,
  SET_ACTIVE,
} from '../constants/ActionTypes';

import { generageGrid } from '../lib/game';


const INITIAL_STATE = {
  grid: generageGrid(),
  started: false,
  level: 1,
  currentActive: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GRID_CHANGED:
      return { ...state, grid: action.payload };
    case LEVEL_STARTED:
      return { ...state, started: true, level: action.payload };
    case SET_ACTIVE:
      return { ...state, currentActive: action.payload };
    default:
      return state;
  }
}
