import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './GameStats.scss';
import { getIncompleteCells } from '../../selectors';

class GameStats extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.title}>Timer</div>
          <div className={styles.value}>{this.props.time} sec</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Left</div>
          <div className={styles.value}>{this.props.left}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Lives</div>
          <div className={styles.value}>{this.props.lives}</div>
        </div>
        <div className={styles.item}>
          <div className={styles.title}>Level</div>
          <div className={styles.value}>{this.props.level}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    time: state.timer.time,
    left: getIncompleteCells(state),
    level: state.game.level,
    lives: state.game.lives
  };
}

export default connect(mapStateToProps)(GameStats);

