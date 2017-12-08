import React from 'react';
import './Card.css';
//import StarIcon from 'react-icons/lib/fa/star';
//import OpenStarIcon from 'react-icons/lib/fa/star-o';
import MaleIcon from 'react-icons/lib/fa/male';
import GlobeIcon from 'react-icons/lib/fa/globe';
import AutoIcon from 'react-icons/lib/fa/automobile';
import PropTypes from 'prop-types';
import starEmpty from '../assets/star-empty.svg';
import starYellow from '../assets/star-yellow.svg';

const Card = ({fav, cardCat, toggleFav, name, stats}) => {
  const categoryIcons = {
    'people': <MaleIcon className="cat-icon"/>,
    'planets': <GlobeIcon className="cat-icon"/>,
    'vehicles': <AutoIcon className="cat-icon"/>
  };

  const type = fav ? 'card fav' : 'card';
  const catIcon = categoryIcons[cardCat];
  const star = fav ? 
    <img src={starYellow} alt="Favorited"/> 
    : <img src={starEmpty} alt="Not Favorited" />;

  const statKeys = Object.keys(stats);
  const statElements = statKeys.map(statKey => {
    return (
      <li key={`${name}-${statKey}`}>
        {`${statKey}: ${stats[statKey]}`}
      </li>
    );
  });

  return (
    <div 
      className={`${type} ${cardCat}`} 
      onClick={ () => toggleFav(name, cardCat)}
    >
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
};

export default Card;

Card.propTypes = {
  fav: PropTypes.bool,
  cardCat: PropTypes.string,
  toggleFav: PropTypes.func,
  name: PropTypes.string,
  stats: PropTypes.object
};