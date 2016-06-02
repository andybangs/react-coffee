import React, { Component } from 'react';
import cL from 'classnames';

const STOPPED = 'STOPPED';
const RUNNING = 'RUNNING';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondsElapsed: 0,
      lastClearedIncrementer: null,
      timerState: STOPPED,
    };

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.noSecondsElapsed = this.noSecondsElapsed.bind(this);
    this.incrementerAtLastCleared = this.incrementerAtLastCleared.bind(this);
  }

  getSeconds() {
    return (`0${this.state.secondsElapsed % 60}`).slice(-2);
  }

  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60);
  }

  handleStartClick() {
    this.setState({ timerState: RUNNING });
    this.incrementer = setInterval(() => {
      this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
    }, 1000);
  }

  handleStopClick() {
    this.setState({ timerState: STOPPED });
    clearInterval(this.incrementer);
    this.setState({ lastClearedIncrementer: this.incrementer });
  }

  handleResetClick() {
    this.setState({ secondsElapsed: 0 });
  }

  noSecondsElapsed() {
    return this.state.secondsElapsed === 0;
  }

  incrementerAtLastCleared() {
    return this.incrementer === this.state.lastClearedIncrementer;
  }

  render() {
    const bgColor = this.state.timerState === RUNNING && this.noSecondsElapsed() ?
      'timer-start' :
      '';

    return (
      <div className={cL('column', bgColor)}>
        <div className="flex-2">
          <h2>Timer</h2>
        </div>

        <div className="flex-2">
          <h1>{this.getMinutes()}:{this.getSeconds()}</h1>
        </div>

        <div className="flex-2"></div>

        <div className={cL('flex-1', 'button-cont')}>
          {(this.noSecondsElapsed() || this.incrementerAtLastCleared()) ?
            <a
              className={cL('button', 'button-left')}
              onClick={this.handleStartClick}
            >start</a> :
            <a
              className={cL('button', 'button-left')}
              onClick={this.handleStopClick}
            >stop</a>
          }
          {(!this.noSecondsElapsed() && this.incrementerAtLastCleared()) ?
            <a
              className={cL('button', 'button-right')}
              onClick={this.handleResetClick}
            >reset</a> :
            null
          }
        </div>

        <div className="flex-1"></div>
      </div>
    );
  }
}

export default Timer;
