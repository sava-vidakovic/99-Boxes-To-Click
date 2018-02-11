import React from 'react';
import PropTypes from 'prop-types';

import styles from './Cell.scss';
import SharedPropTypes from '../../constants/SharedPropTypes';

const getClasses = (cell, gameStarted, active, canClick) => {
  const classes = [styles.cell];
  const possibleCellStates = ['filled', 'completed'];
  if (!gameStarted) {
    classes.push(styles.pointer);
  }
  if (active && active.key === cell.key) {
    classes.push(styles.active);
  }
  if (canClick) {
    classes.push(styles.clickable);
  }
  possibleCellStates.forEach((state) => {
    if (cell[state]) {
      classes.push(styles[state]);
    }
  });
  return classes.join(' ');
};

const Cell = ({
  onCellClick,
  cell,
  gameStarted,
  currentActiveCell,
  canClick,
}) => (
  <div
    role="presentation"
    onKeyPress={() => (false)}
    className={getClasses(cell, gameStarted, currentActiveCell, canClick)}
    onClick={() => onCellClick(cell)}
  />
);

Cell.propTypes = {
  onCellClick: PropTypes.func.isRequired,
  cell: PropTypes.shape(SharedPropTypes.CellPropType).isRequired,
  gameStarted: PropTypes.bool.isRequired,
  currentActiveCell: PropTypes.shape(SharedPropTypes.CellPropType),
  canClick: PropTypes.bool.isRequired,
};

Cell.defaultProps = {
  currentActiveCell: null,
};

export default Cell;
