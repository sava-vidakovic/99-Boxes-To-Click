import React, { Component } from 'react';
import styles from './GameStats.scss';

class GameStats extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.title}>Timer</div>
          <div className={styles.value}>12 sec</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Left</div>
          <div className={styles.value}>12</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Lives</div>
          <div className={styles.value}>12</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Level</div>
          <div className={styles.value}>23</div>
        </div>
      </div>
    );
  }
}

export default GameStats;
