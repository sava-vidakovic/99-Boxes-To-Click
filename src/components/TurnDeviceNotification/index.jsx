import React, { Component } from 'react';

import styles from './TurnDeviceNotification.scss';

class TurnDeviceNotification extends Component {
  constructor() {
    super();
    this.checkOrientation = this.checkOrientation.bind(this);
    this.updateOrientation = this.updateOrientation.bind(this);
    this.state = { show: false, angle: 0 };
  }

  componentDidMount() {
    this.checkOrientation();
    if ((window.screen.orientation) && ('onchange' in window.screen.orientation)) {
      window.screen.orientation.addEventListener('change', this.checkOrientation);
    } else if ('onorientationchange' in window) {
      window.addEventListener('orientationchange', this.checkOrientation);
    }
  }

  componentWillUnmount() {
    if ((window.screen.orientation) && ('onchange' in window.screen.orientation)) {
      window.screen.orientation.removeEventListener('change', this.checkOrientation);
    } else if ('onorientationchange' in window) {
      window.removeEventListener('orientationchange', this.checkOrientation);
    }
  }

  updateOrientation() {
    if (window.orientation) {
      this.setState({ angle: window.orientation });
    }
    if (window.screen.orientation) {
      this.setState({ angle: window.screen.orientation.angle });
    }
    if (!window.orientation && !window.screen.orientation) {
      this.setState({ angle: 0 });
    }
  }

  checkOrientation() {
    this.updateOrientation();
    if (this.state.angle !== 0) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }

  render() {
    return this.state.show ? <div className={styles.turnDeviceNotification} /> : '';
  }
}

export default TurnDeviceNotification;
