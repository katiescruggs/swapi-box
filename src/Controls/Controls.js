import React from 'react';
import './Controls.css';
import MaleIcon from 'react-icons/lib/fa/male';
import GlobeIcon from 'react-icons/lib/fa/globe';
import AutoIcon from 'react-icons/lib/fa/automobile';
import StarIcon from 'react-icons/lib/fa/star';
import PropTypes from 'prop-types';


const Controls = ({chooseCategory, favorites}) => {
  const favNum = favorites.length;
  return (
    <div className="control-buttons">
      <button className="people-button" onClick={chooseCategory}>
        <MaleIcon className="icon"/>
        people
      </button>

      <button className="planets-button" onClick={chooseCategory}>
        <GlobeIcon className="icon"/>
        planets
      </button>

      <button className="vehicles-button" onClick={chooseCategory}>
        <AutoIcon className="icon"/>
        vehicles
      </button>

      <button
        className="fav-button" 
        onClick={() => chooseCategory({target: {innerText: 'favorites'}}) }
      >
        <StarIcon className="icon"/>
        favorites
        <span className="fav-num">{favNum}</span>
      </button>
    </div>
  );
};

export default Controls;

Controls.propTypes = {
  chooseCategory: PropTypes.func,
  favorites: PropTypes.array
};