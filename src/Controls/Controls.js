import React from 'react';

const Controls = ({chooseCategory}) => {
  return (
    <div className="control-buttons">
      <button onClick={chooseCategory}>people</button>
      <button onClick={chooseCategory}>planets</button>
      <button onClick={chooseCategory}>vehicles</button>
    </div>
  );
};

export default Controls;