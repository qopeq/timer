import React, { Component } from 'react';

class ClockComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(),
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({
        currentTime: new Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div>
        Current Time: {this.state.currentTime.toLocaleTimeString()}
      </div>
    );
  }
}

export default ClockComponent;