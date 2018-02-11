import React from 'react';
import { shallow } from 'enzyme';
import TurnDeviceNotification from '../components/TurnDeviceNotification';

document.addEventListener = jest.fn();
window.onorientationchange = ({});

describe('TurnDeviceNotification', () => {
  let mountedTurnDeviceNotification;
  const turnDeviceNotification = () => {
    if (!mountedTurnDeviceNotification) {
      mountedTurnDeviceNotification = shallow(<TurnDeviceNotification />);
    }
    return mountedTurnDeviceNotification;
  };

  beforeEach(() => {
    mountedTurnDeviceNotification = undefined;
  });

  it('by default not vissible', () => {
    const wrapper = turnDeviceNotification();
    expect(wrapper.find('div').length).toEqual(0);
  });

  it('should be vissible on landscape', () => {
    const wrapper = turnDeviceNotification();
    window.rotate(90);
    wrapper.update();
    expect(wrapper.find('div').length).toEqual(1);
  });
});
