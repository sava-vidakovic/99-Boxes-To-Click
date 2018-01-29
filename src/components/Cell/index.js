import React from 'react';

import styles from './Cell';

const getClasses = (cell, gameStarted, active, canClick) => {
  let classes = [styles.cell];
  const possibleCellStates = ['filled', 'completed'];
  if(!gameStarted) {
    classes.push(styles.pointer)
  }
  if(active && active.key === cell.key) {
    classes.push(styles.active)
  }
  if(canClick) {
    classes.push(styles.clickable);
  }
  possibleCellStates.forEach(state => {
    if(cell[state]) {
      classes.push(styles[state]);
    }
  })
  return classes.join(' ');
}

const Cell = ({ onCellClick, cell, isActive, gameStarted, currentActiveCell, canClick }) => {
  return (
    <div 
      className={[getClasses(cell, gameStarted, currentActiveCell, canClick)]} 
      onClick={() => onCellClick(cell)} />
  );
}

export default Cell;
