import {
  TIMER_START,
  TIMER_STOP,
  TIMER_TICK,
} from '../constants/ActionTypes';


const INITIAL_STATE = {
  time: 0,
  started: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIMER_TICK:
      return { ...state, time: state.time + 1 };
    case TIMER_START:
      return { ...state, started: true };
    case TIMER_STOP:
      return { ...state, started: false, time: 0 };
    default:
      return state;
  }
};
