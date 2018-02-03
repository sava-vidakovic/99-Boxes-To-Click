import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Game';
import Cell from '../../components/Cell';
import { startGame, closeCell, startTimer, completeLevel, levelLost } from '../../actions';
import { getPossibleMoves, getIncompleteCells } from '../../selectors';
import buttonTapSound from '../../sounds/buttonTap.mp3';
import levelLostSound from '../../sounds/levelLost.mp3';
import levelPassedSound from '../../sounds/levelPassed.mp3';
import boxAppearSound from '../../sounds/boxAppear.mp3';

class Game extends Component {

  constructor(props) {
    super(props);
    this.onCellClick = this.onCellClick.bind(this);
    this.canClick = this.canClick.bind(this);
    this.buttonTapSound = new Audio(buttonTapSound);
    this.levelLostSound = new Audio(levelLostSound);
    this.levelPassedSound = new Audio(levelPassedSound);
    this.boxAppearSound = new Audio(boxAppearSound);
  }

  componentDidUpdate() {
    this.completeLevel();
    this.levelLost();
  }

  completeLevel() {
    const { gameStarted, possibleMoves, leftCells, completeLevel } = this.props;
    if(gameStarted && possibleMoves.length === 0 && leftCells === 0) {
      completeLevel();
      this.levelPassedSound.play();
    }
  }

  levelLost() {
    const { gameStarted, possibleMoves, leftCells, levelLost } = this.props;
    if(gameStarted && possibleMoves.length === 0 && leftCells > 0) {
      levelLost();
      this.levelLostSound.play();
    }
  }

  canClick(cell) {
    const{ possibleMoves } = this.props;
    return possibleMoves && possibleMoves.includes(cell.key);
  }

  onCellClick(cell) {
    console.log(cell)
    const { startGame, gameStarted, startTimer } = this.props;
    if(gameStarted) {
      this.closeCell(cell);
    } else {
      startGame(cell);
      startTimer();
      this.boxAppearSound.play();
    }
  }

  closeCell(cell) {
    if(this.canClick(cell)) {
      this.buttonTapSound.play();
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
    possibleMoves: getPossibleMoves(state),
    leftCells: getIncompleteCells(state)
  };
}

export default connect(mapStateToProps, { 
    startGame, 
    closeCell, 
    startTimer, 
    completeLevel,
    levelLost,
})(Game);
