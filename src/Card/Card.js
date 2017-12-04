import React from 'react';

const Card = ({fav, category, addFav, removeFav, name, stats}) => {
  
  const addRemoveFav = () => {
    fav ? removeFav(name, category) : addFav(name, category);
  }

  const statKeys = Object.keys(stats);
  const statElements = statKeys.map(key => {
      return <li>{`${key}: ${stats[key]}`}</li>;
  });

  return (
    <div className='card' onClick={addRemoveFav}>
      <h3 className="card-title">{name}</h3>
      <ul className="card-details">
        {statElements}
      </ul>
    </div>
  );
}

export default Card;