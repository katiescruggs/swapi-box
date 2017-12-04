import React from 'react';

const Header = ({chooseCategory}) => {
  return (
    <header>
      <h1>SWAPIbox</h1>
      <button onClick={chooseCategory}>favorites</button>
    </header>
  );
};

export default Header;