import React from 'react';
import Card from '../Card/Card.js';
import './CardContainer.css';

const CardContainer = ({category, data, toggleFav}) => {
  const cards = () => {
    return data.map(datum => {
      return <Card fav={datum.fav}
                   cardCat={datum.cardCat} 
                   toggleFav={toggleFav} 
                   name={datum.name}
                   stats={datum.stats} />
    });
  }
  
  const noCardsMessage = <p className="no-cards-msg">Please select a category</p>;

  const display = data ? cards() : noCardsMessage;

  return (
    <div className="card-container">
      <h2>{category}</h2>
      <div className="card-holder">
        {display}
      </div>
    </div>
  )
};

export default CardContainer;