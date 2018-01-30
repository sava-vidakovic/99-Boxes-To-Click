import {
  TOGGLE_DIALOG,
  LEVEL_COMPLETED,
  GAME_OVER,
} from '../constants/ActionTypes';


const INITIAL_STATE = {
  welcome: true,
  levelCompleted: false,
  gameOver: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return { ...state, [action.payload]: !state[action.payload] };
    case LEVEL_COMPLETED:
      return { ...state, levelCompleted: true };
    case GAME_OVER:
      return { ...state, gameOver: true };
    default:
      return state;
  }
}
