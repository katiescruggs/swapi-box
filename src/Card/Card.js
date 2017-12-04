import React from 'react';
import './Card.css';

const Card = ({fav, category, addFav, removeFav, name, stats}) => {

  const type = fav ? 'card fav' : 'card';
  
  const addRemoveFav = () => {
    fav ? removeFav(name, category) : addFav(name, category);
  }

  const statKeys = Object.keys(stats);
  const statElements = statKeys.map(key => {
      return <li>{`${key}: ${stats[key]}`}</li>;
  });

  return (
    <div className={type} onClick={addRemoveFav}>
      <header>
        <h3 className="card-title">{name}</h3>
      </header>
      <ul className="card-details">
        {statElements}
      </ul>
    </div>
  );
}

export default Card;