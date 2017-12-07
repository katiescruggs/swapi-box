import React from 'react';
import './Card.css';
import StarIcon from 'react-icons/lib/fa/star';
import OpenStarIcon from 'react-icons/lib/fa/star-o';
import MaleIcon from 'react-icons/lib/fa/male';
import GlobeIcon from 'react-icons/lib/fa/globe';
import AutoIcon from 'react-icons/lib/fa/automobile';

const Card = ({fav, cardCat, addFav, removeFav, name, stats}) => {
  const categoryIcons = {
    'people': <MaleIcon className="cat-icon"/>,
    'planets': <GlobeIcon className="cat-icon"/>,
    'vehicles': <AutoIcon className="cat-icon"/>
  }


  const type = fav ? 'card fav' : 'card';
  const catIcon = categoryIcons[cardCat];
  const star = fav ? <StarIcon className="fav-star-icon"/> : <OpenStarIcon className="fav-star-icon open"/>;
  
  const addRemoveFav = () => {
    fav ? removeFav(name, cardCat) : addFav(name, cardCat);
  }

  const statKeys = Object.keys(stats);
  const statElements = statKeys.map(key => {
      return <li>{`${key}: ${stats[key]}`}</li>;
  });

  return (
    <div className={`${type} ${cardCat}`} onClick={addRemoveFav}>
      <header>
        {catIcon}
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