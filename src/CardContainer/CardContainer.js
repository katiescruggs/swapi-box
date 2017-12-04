import React from 'react';
import Card from '../Card/Card.js';

const CardContainer = ({category, data, addFav, removeFav}) => {
  const cards = () => {
    return data.map(datum => {
      return <Card fav={datum.fav}
                   category={category} 
                   addFav={addFav} 
                   removeFav={removeFav}
                   name={datum.name}
                   stats={datum.stats} />
    });
  }

  const noCardsMessage = <p>Please select a category</p>;

  const display = data ? cards() : noCardsMessage;

  return (
    <div className="card-container">
      <h2>{category}</h2>
      {display}
    </div>
  )
};

export default CardContainer;