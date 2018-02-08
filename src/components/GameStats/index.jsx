import React from 'react';
import PropTypes from 'prop-types';


import styles from './GameStats.scss';

const GameStats = ({
  time,
  left,
  level,
  lives,
}) => (
  <div className={styles.container}>
    <div className={styles.item}>
      <div className={styles.title}>Timer</div>
      <div className={styles.value}>{time} sec</div>
    </div>
    <div className={styles.item}>
      <div className={styles.title}>Left</div>
      <div className={styles.value}>{left}</div>
    </div>
    <div className={styles.item}>
      <div className={styles.title}>Lives</div>
      <div className={styles.value}>{lives}</div>
    </div>
    <div className={styles.item}>
      <div className={styles.title}>Level</div>
      <div className={styles.value}>{level}</div>
    </div>
  </div>
);

GameStats.propTypes = {
  time: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
};

export default GameStats;

