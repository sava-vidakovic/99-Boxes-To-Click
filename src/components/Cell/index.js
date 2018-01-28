import React from 'react';

import styles from './Cell';

const getClasses = (cell, gameStarted) => {
  let classes = [styles.cell];
  const possibleStates = ['filled', 'completed', 'active', 'clickable'];
  if(!gameStarted) {
    classes.push(styles.pointer)
  }
  possibleStates.forEach(state => {
    if(cell[state]) {
      classes.push(styles[state]);
    }
  })
  return classes.join(' ');
}

const Cell = ({ onCellClick, cell, isActive, gameStarted }) => {
  return <div className={[getClasses(cell, gameStarted)]} onClick={() => onCellClick(cell)} />
}

export default Cell;
