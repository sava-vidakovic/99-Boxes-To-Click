import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Game.scss';
import Cell from '../../components/Cell';
import { startGame, closeCell, startTimer, completeLevel, levelLost } from '../../actions';
import { getPossibleMoves, getIncompleteCells } from '../../selectors';
import SharedPropTypes from '../../constants/SharedPropTypes';
import buttonTapSound from '../../assets/sounds/buttonTap.mp3';
import levelLostSound from '../../assets/sounds/levelLost.mp3';
import levelPassedSound from '../../assets/sounds/levelPassed.mp3';
import boxAppearSound from '../../assets/sounds/boxAppear.mp3';

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

  onCellClick(cell) {
    const { gameStarted } = this.props;
    if (gameStarted) {
      this.closeCell(cell);
    } else {
      this.props.startGame(cell);
      this.props.startTimer();
      this.boxAppearSound.play();
    }
  }

  canClick(cell) {
    const { possibleMoves } = this.props;
    return possibleMoves && possibleMoves.includes(cell.key);
  }

  levelLost() {
    const {
      gameStarted,
      possibleMoves,
      leftCells,
    } = this.props;

    if (gameStarted && possibleMoves.length === 0 && leftCells > 0) {
      this.props.levelLost();
      this.levelLostSound.play();
    }
  }

  completeLevel() {
    const {
      gameStarted,
      possibleMoves,
      leftCells,
    } = this.props;

    if (gameStarted && possibleMoves.length === 0 && leftCells === 0) {
      this.props.completeLevel();
      this.levelPassedSound.play();
    }
  }

  closeCell(cell) {
    if (this.canClick(cell)) {
      this.buttonTapSound.play();
      this.props.closeCell(cell);
    }
  }

  renderCells() {
    const { gameStarted, currentActiveCell, grid } = this.props;
    return grid.map(row => (
      row.map(cell => (
        <Cell
          key={cell.key}
          cell={cell}
          canClick={this.canClick(cell)}
          onCellClick={this.onCellClick}
          currentActiveCell={currentActiveCell}
          gameStarted={gameStarted}
        />
      ))
    ));
  }

  render() {
    return (
      <div className={styles.grid}>
        {this.renderCells()}
      </div>
    );
  }
}

Game.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  possibleMoves: PropTypes.arrayOf(PropTypes.string).isRequired,
  leftCells: PropTypes.number.isRequired,
  levelLost: PropTypes.func.isRequired,
  completeLevel: PropTypes.func.isRequired,
  closeCell: PropTypes.func.isRequired,
  currentActiveCell: PropTypes.shape(SharedPropTypes.CellPropType),
  grid: PropTypes.arrayOf(PropTypes.array).isRequired,
};

Game.defaultProps = {
  currentActiveCell: null,
};

const mapStateToProps = state => (
  {
    grid: state.game.grid,
    gameStarted: state.game.started,
    currentActiveCell: state.game.currentActive,
    possibleMoves: getPossibleMoves(state),
    leftCells: getIncompleteCells(state),
  }
);

export default connect(mapStateToProps, {
  startGame,
  closeCell,
  startTimer,
  completeLevel,
  levelLost,
})(Game);
