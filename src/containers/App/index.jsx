import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './App.scss';
import Game from '../Game';
import GameStats from '../../components/GameStats';
import WelcomeDialog from '../../components/WelcomeDialog';
import LevelCompletedDialog from '../../components/LevelCompletedDialog';
import LevelFailedDialog from '../../components/LevelFailedDialog/';
import GameOverDialog from '../../components/GameOverDialog';
import TurnDeviceNotification from '../../components/TurnDeviceNotification';
import { toggleDialog, setLevel } from '../../actions';
import { getCompletedLevel, getIncompleteCells } from '../../selectors';


class App extends Component {
  constructor(props) {
    super(props);
    this.onLevelSelected = this.onLevelSelected.bind(this);
  }

  onLevelSelected(level) {
    this.props.setLevel(level);
    this.props.toggleDialog('welcome');
  }

  render() {
    return (
      <div className={styles.app}>
        <TurnDeviceNotification />
        <Game />
        <GameStats
          time={this.props.time}
          left={this.props.leftCells}
          level={this.props.level}
          lives={this.props.lives}
        />
        <WelcomeDialog
          show={this.props.showWelcomeDialog}
          defaultLevel={this.props.level}
          maxLevel={this.props.maxLevel}
          onLevelSelected={this.onLevelSelected}
          onConfirm={() => this.props.toggleDialog('welcome')}
        />
        <LevelCompletedDialog
          show={this.props.showLevelCompletedDialog}
          onConfirm={() => this.props.toggleDialog('levelCompleted')}
          level={this.props.completedLevel}
        />
        <GameOverDialog
          show={this.props.showGameOverDialog}
          onConfirm={() => this.props.toggleDialog('gameOver')}
        />
        <LevelFailedDialog
          show={this.props.showLevelFailDialog}
          onConfirm={() => this.props.toggleDialog('levelFailed')}
          level={this.props.level}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { game, dialogs, timer } = state;
  const {
    started, level, lives, maxLevel,
  } = game;
  const {
    welcome, levelCompleted, levelFailed, gameOver,
  } = dialogs;

  return {
    gameStarted: started,
    level,
    lives,
    maxLevel,
    time: timer.time,
    leftCells: getIncompleteCells(state),
    completedLevel: getCompletedLevel(state),
    showWelcomeDialog: welcome,
    showLevelCompletedDialog: levelCompleted,
    showLevelFailDialog: levelFailed,
    showGameOverDialog: gameOver,
  };
};

App.propTypes = {
  showWelcomeDialog: PropTypes.bool.isRequired,
  setLevel: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
  showLevelCompletedDialog: PropTypes.bool.isRequired,
  showLevelFailDialog: PropTypes.bool.isRequired,
  showGameOverDialog: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  maxLevel: PropTypes.number.isRequired,
  completedLevel: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  leftCells: PropTypes.number.isRequired,
  lives: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, { toggleDialog, setLevel })(App);

