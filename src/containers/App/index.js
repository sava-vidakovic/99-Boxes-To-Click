import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './App.scss';
import Game from '../Game';
import GameStats from '../GameStats';
import WelcomeDialog from '../../components/WelcomeDialog';
import LevelCompletedDialog from '../../components/LevelCompletedDialog';
import LevelFailedDialog from '../../components/LevelFailedDialog/';
import GameOverDialog from '../../components/GameOverDialog';
import { toggleDialog, setLevel } from '../../actions';
import { getCompletedLevel } from '../../selectors';

class App extends Component {
  constructor(props){
    super(props);
    this.onLevelSelected = this.onLevelSelected.bind(this);
  }

  onLevelSelected(level) {
    const { setLevel, toggleDialog } = this.props;
    console.log(level)
    setLevel(level);
    toggleDialog('welcome');
  }

  render() {
    const { 
      showWelcomeDialog, 
      toggleDialog, 
      showLevelCompletedDialog,
      showLevelFailDialog,
      level,
      maxLevel,
      completedLevel,
      showGameOverDialog 
    } = this.props;

    return (
      <div className={styles.app}>
        <Game />
        <GameStats />
        <WelcomeDialog 
          show={showWelcomeDialog}
          defaultLevel={level}
          maxLevel={maxLevel}
          onLevelSelected={this.onLevelSelected}
          onConfirm={() => toggleDialog('welcome')} />
        <LevelCompletedDialog 
          show={showLevelCompletedDialog} 
          onConfirm={() => toggleDialog('levelCompleted')} 
          level={completedLevel} />
        <GameOverDialog
          show={showGameOverDialog}
          onConfirm={() => toggleDialog('gameOver')} />
        <LevelFailedDialog
          show={showLevelFailDialog}
          onConfirm={() => toggleDialog('levelFailed')} 
          level={level} />  
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { game, dialogs } = state;
  const { started, level, maxLevel } = game;
  const { welcome, levelCompleted, levelFailed, gameOver } = dialogs;
  return { 
    gameStarted: started,
    level: level,
    maxLevel: maxLevel,
    completedLevel: getCompletedLevel(state),
    showWelcomeDialog: welcome,
    showLevelCompletedDialog: levelCompleted,
    showLevelFailDialog: levelFailed,
    showGameOverDialog: gameOver,
  };
}

export default connect(mapStateToProps, { toggleDialog, setLevel })(App);

