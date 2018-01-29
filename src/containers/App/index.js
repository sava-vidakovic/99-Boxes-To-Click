import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './App.scss';
import Grid from '../Grid';
import GameStats from '../GameStats';
import WelcomeDialog from '../../components/WelcomeDialog';
import { toogleWelcomeDialog } from '../../actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleWelcomeDialog = this.toggleWelcomeDialog.bind(this);
  }

  toggleWelcomeDialog() {
    this.props.toogleWelcomeDialog();
  }

  render() {
    const { showWelcomeDialog } = this.props;
    return (
      <div className={styles.app}>
        <Grid />
        <GameStats />
        <WelcomeDialog 
          show={showWelcomeDialog} 
          onConfirm={this.toggleWelcomeDialog} />
      </div>
    );
  }
}

const mapStateToProps = ({game, dialogs}) => {
  return { 
    gameStarted: game.started,
    showWelcomeDialog: dialogs.welcomeDialog
  };
}

export default connect(mapStateToProps, { toogleWelcomeDialog })(App);

