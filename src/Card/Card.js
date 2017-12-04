import React from 'react';


const Card = ({type, addFav, removeFav}) => {
  
  function handleClick(type) {
    type === 'fav' ? removeFav() : addFav();
  }

  return (
    <div className='card' onClick={() => handleClick(type)}>
      <h3>I am a card</h3>
    </div>
  );
}

export default Card;