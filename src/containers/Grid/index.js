import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Grid';
import Cell from '../../components/Cell';
import { startGame, closeCell } from '../../actions';
import { getPossibleMoves } from '../../selectors'

class Grid extends Component {

  constructor(props) {
    super(props);
    this.onCellClick = this.onCellClick.bind(this);
    this.canClick = this.canClick.bind(this);
  }

  canClick(cell) {
    const{ possibleMoves } = this.props;
    return possibleMoves && possibleMoves.includes(cell.key);
  }

  onCellClick(cell) {
    const { startGame, gameStarted } = this.props;
    if(gameStarted) {
      this.closeCell(cell);
    } else {
      startGame(cell);
    }
  }

  closeCell(cell) {
    if(this.canClick(cell)) {
      this.props.closeCell(cell);
    }
  }

  renderCells(row) {
    const { gameStarted, currentActiveCell } = this.props;
    return row.map(cell => {
      return (
        <Cell 
          key={cell.key} 
          cell={cell}
          canClick={this.canClick(cell)}
          onCellClick={this.onCellClick}
          currentActiveCell={currentActiveCell}
          gameStarted={gameStarted} />
      )
    })
  }

  renderRows() {
    const { grid } = this.props;
    return grid.map((row, index) => {
      return (
        <div className={styles['grid-row']} key={index}>
          { this.renderCells(row) }
        </div>
      )
    })
  }
  
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.grid}>
          {this.renderRows()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    grid: state.game.grid,
    gameStarted: state.game.started,
    currentActiveCell: state.game.currentActive,
    possibleMoves: getPossibleMoves(state)
  };
}

export default connect(mapStateToProps, { startGame, closeCell })(Grid);
