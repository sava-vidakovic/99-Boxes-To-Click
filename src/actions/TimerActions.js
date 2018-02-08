import {
  TIMER_START,
  TIMER_STOP,
  TIMER_TICK,
} from '../constants/ActionTypes';

let timer = null;

const tick = () => ({ type: TIMER_TICK });

export const startTimer = () => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 1000);
  dispatch({ type: TIMER_START });
  dispatch(tick());
};

export const stopTimer = () => {
  clearInterval(timer);
  return { type: TIMER_STOP };
};
