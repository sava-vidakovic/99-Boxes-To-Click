import { combineReducers } from 'redux';
import GameReducer from './GameReducer';
import TimerReducer from './TimerReducer';

export default combineReducers({
  game: GameReducer,
  timer: TimerReducer,
})
