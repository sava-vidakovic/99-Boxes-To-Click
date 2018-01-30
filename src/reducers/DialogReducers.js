import {
  TOGGLE_DIALOG,
  LEVEL_COMPLETED,
} from '../constants/ActionTypes';


const INITIAL_STATE = {
  welcome: true,
  levelCompleted: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_DIALOG:
      return { ...state, [action.payload]: !state[action.payload] };
    case LEVEL_COMPLETED:
      return { ...state, levelCompleted: true };
    default:
      return state;
  }
}
