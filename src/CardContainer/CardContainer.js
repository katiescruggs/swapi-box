import React from 'react';
import Card from '../Card/Card.js';
import './CardContainer.css';
import PropTypes from 'prop-types';

const CardContainer = ({category, cardData, toggleFav}) => {
  const cards = () => {
    return cardData.map((datum, index) => {
      return (
        <Card
          key={`${category}-${index}`} 
          fav={datum.fav}
          cardCat={datum.cardCat} 
          toggleFav={toggleFav} 
          name={datum.name}
          stats={datum.stats} />
      );
    });
  };
  
  const noCardsMessage = 
    <p className="no-cards-msg">Please select a category</p>;

  const display = cardData ? cards() : noCardsMessage;

  return (
    <div className="card-container">
      <h2>{category}</h2>
      <div className="card-holder">
        {display}
      </div>
    </div>
  );
};

export default CardContainer;

CardContainer.propTypes = {
  category: PropTypes.string,
  cardData: PropTypes.object,
  toggleFav: PropTypes.func
};