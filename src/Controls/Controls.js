import React from 'react';
import './Controls.css';
import MaleIcon from 'react-icons/lib/fa/male';
import GlobeIcon from 'react-icons/lib/fa/globe';
import AutoIcon from 'react-icons/lib/fa/automobile';
import StarIcon from 'react-icons/lib/fa/star';
import PropTypes from 'prop-types';

const buttonInfo = [
  {
    className: 'people-button',
    text: 'people',
    icon: <MaleIcon className="icon"/>,
  },
  {
    className: 'planets-button',
    text: 'planets',
    icon: <GlobeIcon className="icon"/>
  },
  {
    className: 'vehicles-button',
    text: 'vehicles',
    icon: <AutoIcon className="icon"/>
  }
]

const Controls = ({category, chooseCategory, favorites}) => {

  const buttons = buttonInfo.map(button => {
    let className = category === button.text ? `${button.className} active`: button.className;

    return (
      <button className={className} onClick={chooseCategory}>
        {button.icon}
        {button.text}
      </button>
    );
  });
  const favNum = favorites.length;
  
  return (
    <div className="control-buttons">
      {buttons}

      <button
        className="fav-button"
        onClick={() => chooseCategory('favorites')}
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