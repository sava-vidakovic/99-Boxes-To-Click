import { MAX_LEVEL } from '../constants/ActionTypes';

const LocalStorage = {};

LocalStorage.getMaxLevel = () => {
  const maxLevel = parseInt(localStorage.getItem(MAX_LEVEL), 10);
  return maxLevel || 1;
};

LocalStorage.saveMaxLevel = (level) => {
  localStorage.setItem(MAX_LEVEL, level);
};

export default LocalStorage;
