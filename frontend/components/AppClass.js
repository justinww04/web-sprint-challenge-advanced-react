// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
import React from 'react'

const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4

export default class AppClass extends React.Component {
  state = {
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
  }

  getXY = () => {
    const x = this.state.index % 3 + 1;
    const y = Math.floor(this.state.index / 3) + 1;
    return { x, y };
  }

  getXYMessage = () => {
    const { x, y } = this.getXY();
    return `Coordinates (${x}, ${y})`;
  }

  reset = () => {
    this.setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    });
  }

  getNextIndex = (direction) => {
    const moves = {
      left: (this.state.index % 3 !== 0) ? this.state.index - 1 : this.state.index,
      up: (this.state.index > 2) ? this.state.index - 3 : this.state.index,
      right: (this.state.index % 3 !== 2) ? this.state.index + 1 : this.state.index,
      down: (this.state.index < 6) ? this.state.index + 3 : this.state.index,
    };
    return moves[direction] || this.state.index;
  }

  move = (evt) => {
    const direction = evt.target.id;
    const nextIndex = this.getNextIndex(direction);
    this.setState(prevState => ({
      index: nextIndex,
      steps: prevState.index !== nextIndex ? prevState.steps + 1 : prevState.steps,
    }));
  }

  onChange = (evt) => {
    this.setState({ email: evt.target.value });
  }

  onSubmit = async (evt) => {
    evt.preventDefault();
    const { x, y, steps, email } = this.state;
    try {
      const response = await fetch('http://localhost:9000/api/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x, y, steps, email }),
      });
      const data = await response.json();
      this.setState({ message: data.message });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  render() {
    const { className } = this.props
    const { email, steps } = this.state;
    return (
      <div id="wrapper" className={className}>
        <p>(This component is not required to pass the sprint)</p>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {steps} times</h3>
        </div>
        <div id="grid">
          {[...Array(9)].map((_, idx) => (
            <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`} onClick={this.move}>
              {idx === this.state.index ? 'B' : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={email} onChange={this.onChange}></input>
          <input id="submit" type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}
