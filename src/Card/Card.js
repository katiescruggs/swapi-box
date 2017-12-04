import React from 'react';


const Card = ({type, addFav, removeFav, name, stats}) => {
  
  const addRemoveFav = (type) => {
    type === 'fav' ? removeFav() : addFav();
  }

  if(name && stats) {
    const statKeys = Object.keys(stats);
    const statElements = statKeys.map(key => {
        return <li>{`${key}: ${stats[key]}`}</li>;
    });

    return (
      <div className='card' onClick={() => addRemoveFav(type)}>
        <h3 className="card-title">{name}</h3>
        <ul className="card-details">
          {statElements}
        </ul>
      </div>
    );
  } else {
    return null;
  }
}

export default Card;