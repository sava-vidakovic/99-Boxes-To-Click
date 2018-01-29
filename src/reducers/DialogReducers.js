import {
  TOGGLE_WELCOME_DIALOG,
} from '../constants/ActionTypes';


const INITIAL_STATE = {
  welcomeDialog: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_WELCOME_DIALOG:
      return { ...state, welcomeDialog: !state.welcomeDialog };
    default:
      return state;
  }
}
