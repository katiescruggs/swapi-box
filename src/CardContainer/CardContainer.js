import React from 'react';
import Card from '../Card/Card.js';

const CardContainer = ({category, addFav, removeFav}) => {
  return (
    <div className="card-container">
      <h2>{category}</h2>
      <Card type="" addFav={addFav} removeFav={removeFav} />
    </div>
  )
};

export default CardContainer;