import React from 'react';
import { mount } from 'enzyme';
import { Game } from '../containers/Game';
import gridMock from './__mocks__/gridMock';


describe('GameComponent', () => {
  let mountedGame;
  let props;
  const game = () => {
    if (!mountedGame) {
      mountedGame = mount(<Game {...props} />);
    }
    return mountedGame;
  };

  beforeEach(() => {
    mountedGame = undefined;
    props = {
      onCellClick: jest.fn(),
      startGame: jest.fn(),
      startTimer: jest.fn(),
      completeLevel: jest.fn(),
      levelLost: jest.fn(),
      closeCell: jest.fn(),
      possibleMoves: ['cell_9_6'],
      leftCells: 2,
      gameStarted: true,
      currentActiveCell: null,
      canClick: false,
      grid: gridMock,
    };
  });

  it('should start game on cell click', () => {
    props.gameStarted = false;
    const cell = {
      key: 'cell_9_9',
      position: {
        x: 9,
        y: 9,
      },
      filled: true,
      completed: false,
    };
    const gameInstance = game().instance();
    gameInstance.boxAppearSound.play = jest.fn();
    gameInstance.onCellClick(cell);
    expect(props.startGame).toHaveBeenCalled();
    expect(props.startTimer).toHaveBeenCalled();
    expect(gameInstance.boxAppearSound.play).toHaveBeenCalled();
  });

  it('should able to click on cell', () => {
    const gameInstance = game().instance();
    const result = gameInstance.canClick({ key: 'cell_9_6' });
    expect(result).toEqual(true);
  });

  it('should not able to click on cell', () => {
    const gameInstance = game().instance();
    const result = gameInstance.canClick({ key: 'cell_9_9' });
    expect(result).toEqual(false);
  });

  it('should be game over if no possible moves', () => {
    props.possibleMoves = [];
    const gameInstance = game().instance();
    gameInstance.levelLostSound.play = jest.fn();
    gameInstance.levelLost();
    expect(props.levelLost).toHaveBeenCalled();
    expect(gameInstance.levelLostSound.play).toHaveBeenCalled();
  });

  it('should able to continue playing if has possible moves', () => {
    const gameInstance = game().instance();
    gameInstance.levelLost();
    expect(props.levelLost).not.toHaveBeenCalled();
  });

  it('should complete level if no more cells to click', () => {
    props.leftCells = 0;
    props.possibleMoves = [];
    const gameInstance = game().instance();
    gameInstance.levelPassedSound.play = jest.fn();
    gameInstance.completeLevel();
    expect(props.completeLevel).toHaveBeenCalled();
    expect(gameInstance.levelPassedSound.play).toHaveBeenCalled();
  });

  it('should not able to complete level if all cells not completed', () => {
    const gameInstance = game().instance();
    gameInstance.completeLevel();
    expect(props.completeLevel).not.toHaveBeenCalled();
  });

  it('should close cell', () => {
    const gameInstance = game().instance();
    gameInstance.closeCell({ key: 'cell_9_6' });
    expect(props.closeCell).toHaveBeenCalled();
  });

  it('should render all cells', () => {
    const cells = game().find('.cell');
    expect(cells.length).toEqual(100);
  });
});
