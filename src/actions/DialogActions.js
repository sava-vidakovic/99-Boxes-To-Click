import { 
  TOGGLE_DIALOG,
} from '../constants/ActionTypes';

export const toggleDialog = (dialog) => {
  return {
    type: TOGGLE_DIALOG,
    payload: dialog
  }
}
