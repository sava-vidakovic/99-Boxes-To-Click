import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Grid';
import Cell from '../../components/Cell';
import { startGame } from '../../actions';

class Grid extends Component {

  constructor(props) {
    super(props);
    this.onCellClick = this.onCellClick.bind(this);
  }

  onCellClick(cell) {
    this.props.startGame(cell);
  }

  renderCells() {
    const { grid, gameStarted } = this.props;
    return grid.map((row, index) => {
      return (
        <div className={styles['grid-row']} key={index}>
          {
            row.map(cell => {
              return (
                <Cell key={cell.key} cell={cell} onCellClick={this.onCellClick} gameStarted={gameStarted}  />
              )
            })
          }
        </div>
      )
    })
  }
  
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    grid: state.game.grid,
    gameStarted: state.game.started,
  };
}

export default connect(mapStateToProps, {startGame})(Grid);

