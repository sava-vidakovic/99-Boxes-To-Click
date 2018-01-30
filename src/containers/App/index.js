import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './App.scss';
import Grid from '../Grid';
import GameStats from '../GameStats';
import WelcomeDialog from '../../components/WelcomeDialog';
import LevelCompletedDialog from '../../components/LevelCompletedDialog';
import LevelFailedDialog from '../../components/LevelFailedDialog/';
import GameOverDialog from '../../components/GameOverDialog';
import { toggleDialog } from '../../actions';

class App extends Component {

  render() {
    const { 
      showWelcomeDialog, 
      toggleDialog, 
      showLevelCompletedDialog,
      showLevelFailDialog,
      level, 
      showGameOverDialog 
    } = this.props;

    return (
      <div className={styles.app}>
        <Grid />
        <GameStats />
        <WelcomeDialog 
          show={showWelcomeDialog} 
          onConfirm={() => toggleDialog('welcome')} />
        <LevelCompletedDialog 
          show={showLevelCompletedDialog} 
          onConfirm={() => toggleDialog('levelCompleted')} 
          level={level} />
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

const mapStateToProps = ({game, dialogs}) => {
  return { 
    gameStarted: game.started,
    level: game.level,
    showWelcomeDialog: dialogs.welcome,
    showLevelCompletedDialog: dialogs.levelCompleted,
    showLevelFailDialog: dialogs.levelFailed,
    showGameOverDialog: dialogs.gameOver,
  };
}

export default connect(mapStateToProps, { toggleDialog })(App);

