import {
  GRID_CHANGED,
} from '../constants/ActionTypes';

import { generageGrid } from '../lib/game';


const INITIAL_STATE = {
  grid: generageGrid(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GRID_CHANGED:
      return { ...state, grid: action.payload };
    default:
      return state;
  }
}
