import React, { Component } from 'react';
import styles from './App.scss';

import Grid from '../Grid'

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Grid />
        
      </div>
    );
  }
}

export default App;
