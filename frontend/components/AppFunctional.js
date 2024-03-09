import React, { useState } from 'react';
import axios from 'axios';

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY(idx) {
    const x = idx % 3 + 1;
    const y = Math.floor(idx / 3) + 1;
    return { x, y };
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
    let nextIndex = index;

    switch (direction) {
      case 'left':
        if (index % 3 !== 0) {
          nextIndex = index - 1;
        }
        break;
      case 'up':
        if (index > 2) {
          nextIndex = index - 3;
        }
        break;
      case 'right':
        if (index % 3 !== 2) {
          nextIndex = index + 1;
        }
        break;
      case 'down':
        if (index < 6) {
          nextIndex = index + 3;
        }
        break;
      default:
        break;
    }

    return nextIndex;
  }

  function move(evt) {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);

    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setMessage(''); 
    } else {
      setMessage(`You can't go ${direction}`);
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const x = (index % 3) + 1;
    const y = Math.floor(index / 3) + 1;

    const payload = {
      x: x,
      y: y,
      steps: steps,
      email: email,
    };

    axios
      .post('http://localhost:9000/api/result', payload)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });

    setEmail(initialEmail);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${getXY(index).x}, ${getXY(index).y})`}</h3>
        <h3 id="steps">{`You moved ${steps} time${steps === 1 ? '' : 's'}`}</h3>
      </div>
      <div id="grid">
        {[...Array(9)].map((_, idx) => (
          <div key={idx} className={`square${index === idx ? ' active' : ''}`}>
            {index === idx ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange} />
        <input id="submit" type="submit" />
      </form>
    </div>
  );
}