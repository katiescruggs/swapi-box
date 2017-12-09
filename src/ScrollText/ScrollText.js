import React from 'react';
import './ScrollText.css';
import PropTypes from 'prop-types';

const ScrollText = ({film}) => {
  
  const paragraphs = film.crawl.map( (paragraph, index) => {
    return (
      <p key={`paragraph-${index}`} className="scroll-p">
        {paragraph}
      </p>
    );
  });  

  return (
    <div className="scrolltext-big-container">
      <div className="scrolltext-small-container">
        <h4 className="scroll-h4">{film.episode}</h4>
        <h3 className="scroll-h3">{film.title}</h3>
        {paragraphs}
        <p className="scroll-p release-date">{`Released: ${film.date}`}</p>
      </div>
    </div>
  );
};

export default ScrollText;

ScrollText.propTypes = {
  film: PropTypes.object
};