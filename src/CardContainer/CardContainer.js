import React from 'react';
import Card from '../Card/Card.js';

const CardContainer = ({category, data, addFav, removeFav}) => {
  const cards = data.map(datum => {
    return <Card type="" 
            addFav={addFav} 
            removeFav={removeFav}
            name={datum.name}
            stats={datum.stats} />
  });

  return (
    <div className="card-container">
      <h2>{category}</h2>
      {cards}
    </div>
  )
};

export default CardContainer;