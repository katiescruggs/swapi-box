import React from 'react';
import './Controls.css';

const Controls = ({chooseCategory}) => {
  return (
    <div className="control-buttons">
      <button onClick={chooseCategory}>people</button>
      <button onClick={chooseCategory}>planets</button>
      <button onClick={chooseCategory}>vehicles</button>
      <button onClick={chooseCategory}>favorites</button>
    </div>
  );
};

export default Controls;