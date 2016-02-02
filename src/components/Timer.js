import React, { Component } from 'react'
import cL from 'classnames'

class Timer extends Component {
  constructor(props) {
    super(props)

    this.handleStartClick = this.handleStartClick.bind(this)
    this.handleStopClick = this.handleStopClick.bind(this)
    this.handleResetClick = this.handleResetClick.bind(this)

    this.state = { secondsElapsed: 0, lastClearedIncrementer: null }
  }

  getSeconds() {
    return ('0' + this.state.secondsElapsed % 60).slice(-2)
  }

  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60)
  }

  handleStartClick() {
    this.incrementer = setInterval(() => {
      this.setState({ secondsElapsed: this.state.secondsElapsed + 1 })
    }, 1000)
  }

  handleStopClick() {
    clearInterval(this.incrementer)
    this.setState({ lastClearedIncrementer: this.incrementer })
  }

  handleResetClick() {
    this.setState({ secondsElapsed: 0 })
  }

  render() {
    return (
      <div className={ cL("column", "timer") }>
        <div className="flex-2">
          <h2>Timer</h2>
        </div>

        <div className="flex-2">
          <h1>{this.getMinutes()}:{this.getSeconds()}</h1>
        </div>

        <div className="flex-2"></div>

        <div className={ cL("flex-1", "button-cont") }>
          {(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer) ?
            <a className={ cL("button", "button-left") }
              onClick={this.handleStartClick.bind(this)}>start</a> :
            <a className={ cL("button", "button-left") }
              onClick={this.handleStopClick.bind(this)}>stop</a>
          }
          {(this.state.secondsElapsed !== 0 && this.incrementer === this.state.lastClearedIncrementer) ?
            <a className={ cL("button", "button-right") } onClick={this.handleResetClick.bind(this)}>reset</a> :
            null
          }
        </div>

        <div className="flex-1"></div>

      </div>
    )
  }
}

export default Timer
