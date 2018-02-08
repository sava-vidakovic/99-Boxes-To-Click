import { combineReducers } from 'redux';
import GameReducer from './GameReducers';
import TimerReducer from './TimerReducers';
import DialogReducer from './DialogReducers';

export default combineReducers({
  game: GameReducer,
  timer: TimerReducer,
  dialogs: DialogReducer,
});
