import React from 'react';

import styles from './Cell';

const getClass = (cell, isActive) => {
  let classes = [styles.cell];
  return classes.join(' ');
}

const Cell = ({ onCellClick, cell, isActive }) => {
  return <div className={getClass(cell)} onClick={() => onCellClick(cell)} />
}

export default Cell;
