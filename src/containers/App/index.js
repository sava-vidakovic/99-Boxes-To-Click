import React, { Component } from 'react';
import styles from './App.scss';

import Grid from '../Grid';
import GameStats from '../GameStats';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Grid />
        <GameStats />
      </div>
    );
  }
}

export default App;
