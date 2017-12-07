import React from 'react';
import './Card.css';
import StarIcon from 'react-icons/lib/fa/star';
import OpenStarIcon from 'react-icons/lib/fa/star-o';


const Card = ({fav, category, addFav, removeFav, name, stats}) => {

  const type = fav ? 'card fav' : 'card';
  const star = fav ? <StarIcon className="fav-star-icon"/> : <OpenStarIcon className="fav-star-icon open"/>;
  
  const addRemoveFav = () => {
    fav ? removeFav(name, category) : addFav(name, category);
  }

  const statKeys = Object.keys(stats);
  const statElements = statKeys.map(key => {
      return <li>{`${key}: ${stats[key]}`}</li>;
  });

  return (
    <div className={`${type} ${category}`} onClick={addRemoveFav}>
      <header>
        <h3 className="card-title">{name}</h3>
        {star}
      </header>
      <ul className="card-details">
        {statElements}
      </ul>
    </div>
  );
}

export default Card;