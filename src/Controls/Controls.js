import React from 'react';
import './Controls.css';

const Controls = ({chooseCategory, favorites}) => {
  const favNum = favorites.length;
  return (
    <div className="control-buttons">
      <button onClick={chooseCategory}>people</button>
      <button onClick={chooseCategory}>planets</button>
      <button onClick={chooseCategory}>vehicles</button>
      <button onClick={() => chooseCategory({target: {innerText: 'favorites'}}) }>favorites - {favNum}</button>
    </div>
  );
};

export default Controls;