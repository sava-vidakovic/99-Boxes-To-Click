import React from 'react';
import { shallow } from 'enzyme';
import Cell from '../components/Cell';


describe('TurnDeviceNotification', () => {
  let mountedCell;
  let props;
  const cell = () => {
    if (!mountedCell) {
      mountedCell = shallow(<Cell {...props} />);
    }
    return mountedCell;
  };

  beforeEach(() => {
    mountedCell = undefined;
    props = {
      onCellClick: jest.fn(),
      cell: {
        key: 'cell_1_1',
        position: { x: 1, y: 1 },
        filled: false,
        completed: false,
      },
      gameStarted: false,
      currentActiveCell: null,
      canClick: false,
    };
  });

  it('should have pointer class if the game not started', () => {
    expect(cell().hasClass('pointer')).toEqual(true);
  });

  it('should have clickable class', () => {
    props.canClick = true;
    expect(cell().hasClass('clickable')).toEqual(true);
  });

  it('should have filled class', () => {
    props.cell.filled = true;
    expect(cell().hasClass('filled')).toEqual(true);
  });

  it('should have completed class', () => {
    props.cell.completed = true;
    expect(cell().hasClass('completed')).toEqual(true);
  });

  it('should have active class', () => {
    props.currentActiveCell = props.cell;
    expect(cell().hasClass('active')).toEqual(true);
  });

  it('should call onCellClick on cell click', () => {
    cell().simulate('click');
    expect(props.onCellClick).toHaveBeenCalled();
  });
});
