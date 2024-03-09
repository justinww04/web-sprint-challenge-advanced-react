import React, { useState } from 'react';

export default function AppFunctional(props) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [steps, setSteps] = useState(0);
  const [index, setIndex] = useState(4); // Center of a 3x3 grid

  // Convert the 1D index to 2D coordinates for display
  const getXY = () => {
    const x = index % 3 + 1; // Assuming the grid starts at 1,1 at top-left
    const y = Math.floor(index / 3) + 1;
    return { x, y };
  };

  const reset = () => {
    setMessage('');
    setEmail('');
    setSteps(0);
    setIndex(4); // Reset to center position
  };

  const getNextIndex = (direction) => {
    const map = {
      up: index > 2 ? index - 3 : index,
      down: index < 6 ? index + 3 : index,
      left: index % 3 !== 0 ? index - 1 : index,
      right: index % 3 !== 2 ? index + 1 : index,
    };
    return map[direction];
  };

  const move = (direction) => {
    const nextIndex = getNextIndex(direction);
    if (index !== nextIndex) {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setMessage(''); // Clear message on successful move
    } else {
      setMessage(`You can't go ${direction}`);
    }
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    // Validation and success message logic
    if (!email) {
      setMessage('Ouch: email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Ouch: email must be a valid email');
    } else if (email === 'foo@bar.baz') {
      setMessage('foo@bar.baz failure #71');
    } else {
      // Example success message, adjust according to your logic
      const successNumber = Math.floor(Math.random() * 100) + 1;
      setMessage(`${email} win #${successNumber}`);
      setEmail(''); // Clear email input on successful submission
      reset(); // Reset coordinates and steps
    }
  };

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({getXY().x}, {getXY().y})</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
      </div>
      <div id="grid">
        {[...Array(9)].map((_, idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>{idx === index ? 'B' : null}</div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>LEFT</button>
        <button id="up" onClick={() => move('up')}>UP</button>
        <button id="right" onClick={() => move('right')}>RIGHT</button>
        <button id="down" onClick={() => move('down')}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
        <input id="submit" type="submit" value="Submit" />
      </form>
    </div>
  );
}